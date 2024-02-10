import { getChartviewBaseChartId } from 'common/constant/ids';
import { MovingAverageProps } from 'common/calculations/props/schema';
import { DefaultDataProps } from 'components/Charting/BaseChart/schema/schema';
import { ChartTypes } from 'components/Charting/BaseChart/type';
import { create } from 'zustand';
import { useBaseChartStore } from './basechart';
import { addChart } from 'components/Charting/BaseChart/actions';
import { isArray, stringToColour } from 'common/helper/general';
import { removeChart } from 'components/Charting/BaseChart/actions';
import { addLineTracker } from 'components/Charting/BaseChart/plugins';

/**
 * Stores the ticker data that is shown on the grid (i.e. The ticker time series)
 */
export interface TickerDataStoreTypes {
    data: {
        [ticker: string]: DefaultDataProps;
    };
    setData: (props: { ticker: string; data: DefaultDataProps }) => void;
}

export const useTickerDataStore = create<TickerDataStoreTypes>(set => ({
    data: {},
    setData: (props: { ticker: string; data: DefaultDataProps }) =>
        set((state: TickerDataStoreTypes) => {
            return {
                data: {
                    ...state.data,
                    [props.ticker]: props.data,
                },
            };
        }),
}));

/**
 * Stores the data point the cursor is currently on as it is moving around the chart, to be able to show as some form of tooltip
 */
export type AllowedLiveMoveValueTypes = number | string | Date | null;
export interface EditLiveMovePropTypes {
    ticker: string;
    metricId: string;
    value: AllowedLiveMoveValueTypes;
}
export interface RemoveLiveMoveMetricPropTypes extends Omit<EditLiveMovePropTypes, 'value'> {}

export interface EditLiveMoveTypes {
    liveMoves: {
        [ticker: string]: {
            [metric: string]: AllowedLiveMoveValueTypes;
        };
    };
    setLiveMoves: (props: EditLiveMovePropTypes) => void;
    removeLiveMovesMetric: (props: RemoveLiveMoveMetricPropTypes) => void;
}
export const useLiveMovesStore = create<EditLiveMoveTypes>(set => ({
    liveMoves: {},
    setLiveMoves: (props: EditLiveMovePropTypes) =>
        set((state: EditLiveMoveTypes) => {
            const newLiveMoves = { ...state.liveMoves };
            // Initialise an empty object for the ticker to add in metrics
            if (!Object.keys(state.liveMoves).includes(props.ticker)) {
                newLiveMoves[props.ticker] = {};
            }
            newLiveMoves[props.ticker][props.metricId] = props.value;
            return { liveMoves: newLiveMoves };
        }),
    removeLiveMovesMetric: (props: RemoveLiveMoveMetricPropTypes) =>
        set((state: EditLiveMoveTypes) => {
            const newLiveMoves = { ...state.liveMoves };
            delete newLiveMoves[props.ticker][props.metricId];
            return { liveMoves: newLiveMoves };
        }),
}));

/**
 * Controls the metrics that is currently chosen by the selected grid view (on each ticker)
 * ------------------
 * Naming Conventions
 * ------------------
 * ticker: The unique ticker symbol.
 * metric: The unique metric id that we are currently using. Together with ticker, this creates a unique key that we are able to delete the entry of.
 * field: The data field belonging to the ticker that we will use to calculate the metric on. Must be a continuous time series of number[].
 * values: The calculated array of __field__ that we have calculated the metric on.
 */
const initiateMetric = (props: { ticker: string; newEntry: any; newMetrics: any }) => {
    const baseChartId: string = getChartviewBaseChartId(props.ticker);
    const { x, y, dataX } = useBaseChartStore.getState().charts[props.ticker];

    if (!isArray(props.newEntry.value)) {
        // Object.keys(props.newEntry.value).map((entryKeys: string) => {
        //     addChart({
        //         id: `${props.newEntry.metricId}_${entryKeys}`,
        //         baseId: baseChartId,
        //         x: x,
        //         y: y,
        //         dataX: dataX,
        //         dataY: props.newEntry.value[entryKeys],
        //         color: stringToColour(`${props.newEntry.metricId}_${entryKeys}`),
        //         type: 'line',
        //     });
        // })
    } else {
        // Add the metric to our chart when it is added into the metric store
        addChart({
            id: props.newEntry.metricId,
            baseId: baseChartId,
            x: x,
            y: y,
            dataX: dataX,
            dataY: props.newEntry.value,
            color: stringToColour(props.newEntry.metricId),
            type: props.newEntry.chartType ?? 'line',
        });
    }
    addLineTracker({
        x: x,
        y: y,
        baseId: baseChartId,
        ticker: props.ticker,
        metrics: props.newMetrics[props.ticker],
    });
};
export type MetricCalculableFields = 'price' | 'lower' | 'volume';
export type TechnicalIndicatorsKeys = Extract<any, string>;

export interface TickerMetricStoreFormat {
    metric: TechnicalIndicatorsKeys;
    field: MetricCalculableFields;
    value: number[];
    color: string;
    metricId: string;
    metricParams: MovingAverageProps;
    chartType?: ChartTypes;
}

interface AddMetricPropType {
    ticker: string;
    value: TickerMetricStoreFormat;
}
interface SetMetricPropType extends AddMetricPropType {
    replacementId: string;
}
interface RemoveMetricPropType {
    ticker: string;
    metricId: string;
}
interface RemoveTickerPropType {
    ticker: string;
}
interface EditselectedMetricIdPropType {
    metric: string;
}

export interface MetricStoreTypes {
    selectedMetricId: string | null;
    metrics: {
        [ticker: string]: TickerMetricStoreFormat[];
    };
    addMetric: (props: AddMetricPropType) => void;
    setMetric: (props: SetMetricPropType) => void;
    removeMetric: (props: RemoveMetricPropType) => void;
    removeTicker: (props: RemoveTickerPropType) => void;
    setselectedMetricId: (props: EditselectedMetricIdPropType) => void;
}

export const useMetricStore = create<MetricStoreTypes>(set => ({
    selectedMetricId: null,
    metrics: {},
    addMetric: (props: AddMetricPropType) =>
        set((state: MetricStoreTypes) => {
            const newMetrics: { [ticker: string]: TickerMetricStoreFormat[] } = {
                ...state.metrics,
            }; // Create a new metric object
            // Create shell array if the entry does not already exist
            if (!Object.keys(newMetrics).includes(props.ticker)) {
                newMetrics[props.ticker] = [];
            }
            const newEntry = props.value;
            // Check if the metric with the same id already exists
            let metricExists = false;

            newMetrics[props.ticker].map(entry => {
                if (entry.metricId === newEntry.metricId) {
                    metricExists = true;
                    return;
                }
            });
            // If it exist, then just return the original
            if (metricExists) {
                return { metrics: state.metrics };
            } else {
                newMetrics[props.ticker] = [...newMetrics[props.ticker], newEntry];

                initiateMetric({
                    ticker: props.ticker,
                    newEntry: newEntry,
                    newMetrics: newMetrics,
                });

                return { metrics: newMetrics };
            }
        }),
    setMetric: (props: SetMetricPropType) =>
        set((state: MetricStoreTypes) => {
            const newMetrics = { ...state.metrics };
            // Fill in any missing parameters

            const baseChartId = getChartviewBaseChartId(props.ticker);

            newMetrics[props.ticker] = newMetrics[props.ticker].map(
                (entry: TickerMetricStoreFormat) => {
                    // metricParams must be present if the metrics is required to be replaced
                    const returnEntry =
                        entry.metricId === props.replacementId ? props.value : entry;
                    return returnEntry;
                }
            );

            removeChart({
                baseId: baseChartId,
                id: props.replacementId,
                selectAll: true,
            });

            initiateMetric({
                ticker: props.ticker,
                newEntry: props.value,
                newMetrics: newMetrics,
            });

            return { metrics: newMetrics };
        }),
    removeMetric: (props: RemoveMetricPropType) =>
        set((state: MetricStoreTypes) => {
            const newMetrics = { ...state.metrics };
            newMetrics[props.ticker] = newMetrics[props.ticker].filter(
                (entry: TickerMetricStoreFormat) => entry.metricId !== props.metricId
            );
            // Remove the line from our chart
            const baseChartId: string = getChartviewBaseChartId(props.ticker);
            const { x, y } = useBaseChartStore.getState().charts[props.ticker];

            removeChart({
                baseId: baseChartId,
                id: props.metricId,
                selectAll: true,
            });

            addLineTracker({
                x: x,
                y: y,
                baseId: baseChartId,
                ticker: props.ticker,
                metrics: newMetrics[props.ticker],
            });

            return { metrics: newMetrics };
        }),
    removeTicker: (props: RemoveTickerPropType) =>
        set((state: MetricStoreTypes) => {
            const newMetrics = { ...state.metrics };
            delete newMetrics[props.ticker];
            return { metrics: newMetrics };
        }),
    setselectedMetricId: (props: EditselectedMetricIdPropType) =>
        set((_: MetricStoreTypes) => {
            return { selectedMetricId: props.metric };
        }),
}));
