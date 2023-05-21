import { getChartviewBaseChartId } from 'components/Analysis/Chartview/Chartview';
import { getIndicatorIdFromMetric, technicalIndicators } from 'components/Analysis/Chartview/calculations/metrics';
import { MovingAverageProps } from 'components/Analysis/Chartview/calculations/schemas/props/schema';
import { DefaultDataProps } from 'components/Charting/BaseChart/schema/schema';
import { ChartTypes } from 'components/Charting/BaseChart/type';
import { create } from 'zustand';
import { useBaseChartStore } from './basechart';
import { addChart } from 'components/Charting/BaseChart/actions';
import { stringToColour } from 'common/helper/general';
import { removeLine } from 'components/Charting/BaseChart/plugins/editChart/removeChart';
import { addLineTracker } from 'components/Charting/BaseChart/plugins';
/**
 * This interface and the const function below controls the grid view (how many grids u are able to see on screen)
 */
export interface WatchlistStoreTypes {
    gridSelected: [number, number];
    setGridSelected: (gridSelected: [number, number]) => void;
}

export const useWatchlistStore = create<WatchlistStoreTypes>(set => ({
    gridSelected: [0, 0],
    setGridSelected: (props: [number, number]) => set({ gridSelected: props }),
}));

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
export interface RemoveLiveMoveMetricPropTypes extends Omit<EditLiveMovePropTypes, 'value'> { }

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
 * Stores the data that is required for plotting the different line chart formats
 */
export interface ChartStoreTypes {
    charts: { [ticker: string]: TickerChartType };
    setChart: (props: EditChartPropType) => void;
}
interface TickerChartType {
    color: string;
    type: ChartTypes
    draw?: boolean;
}
interface EditChartPropType {
    ticker: string;
    chart: TickerChartType;
}

export const useChartStore = create<ChartStoreTypes>(set => ({
    charts: {},
    setChart: (props: EditChartPropType) => {
        set((state: ChartStoreTypes) => {
            return { charts: { ...state.charts, [props.ticker]: props.chart } };
        });
    },
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

export type MetricCalculableFields = 'price' | 'lower' | 'volume';
export type TechnicalIndicatorsKeys = Extract<keyof typeof technicalIndicators, string>;

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
                const baseChartId: string = getChartviewBaseChartId(props.ticker);
                const { x, y, dataX } = useBaseChartStore.getState().charts[baseChartId]
                // Add the metric to our chart when it is added into the metric store
                addChart({
                    id: newEntry.metricId,
                    baseId: baseChartId,
                    x: x,
                    y: y,
                    dataX: dataX,
                    dataY: newEntry.value,
                    color: stringToColour(newEntry.metricId),
                    type: newEntry.chartType ?? 'line',
                })
                addLineTracker({
                    baseId: baseChartId,
                    ticker: props.ticker,
                    metrics: newMetrics[props.ticker],
                })
                return { metrics: newMetrics };
            }
        }),
    setMetric: (props: SetMetricPropType) =>
        set((state: MetricStoreTypes) => {
            const newMetrics = { ...state.metrics };
            // Fill in any missing parameters

            const baseChartId = getChartviewBaseChartId(props.ticker)
            const { x, y, dataX } = useBaseChartStore.getState().charts[baseChartId]

            newMetrics[props.ticker] = newMetrics[props.ticker].map(
                (entry: TickerMetricStoreFormat) => {
                    // metricParams must be present if the metrics is required to be replaced
                    const returnEntry =
                        entry.metricId === props.replacementId ? props.value : entry;
                    return returnEntry;
                }
            );

            removeLine({
                baseId: baseChartId,
                id: props.replacementId,
            })

            addChart({
                baseId: baseChartId,
                id: props.value.metricId,
                x: x,
                y: y,
                dataX: dataX,
                dataY: props.value.value,
                color: stringToColour(props.value.metricId),
                type: props.value.chartType ?? 'line',
            })

            addLineTracker({
                baseId: baseChartId,
                ticker: props.ticker,
                metrics: newMetrics[props.ticker],
            })

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
            removeLine({
                baseId: baseChartId,
                id: props.metricId,
            })
            addLineTracker({
                baseId: baseChartId,
                ticker: props.ticker,
                metrics: newMetrics[props.ticker],
            })
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
