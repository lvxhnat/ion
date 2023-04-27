import { stringToColour } from 'common/helper/general';
import {
    indicatorIdDelimiter,
    technicalIndicators,
    technicalIndicatorsParams,
} from 'components/Analysis/Chartview/calculations/metrics';
import { MovingAverageProps } from 'components/Analysis/Chartview/calculations/types';
import { DefaultDataProps } from 'components/Charting/BaseChart/schema/schema';
import { create } from 'zustand';
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
export interface EditLiveMovePropTypes {
    ticker: string;
    metricId: string;
    value: number | null;
}
export interface RemoveLiveMoveMetricPropTypes extends Omit<EditLiveMovePropTypes, 'value'> {}

export interface EditLiveMoveTypes {
    liveMoves: {
        [ticker: string]: {
            [metric: string]: number | null;
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

export type MetricCalculableFields = 'price' | 'lower' | 'volume';
export type TechnicalIndicatorsKeys = Extract<keyof typeof technicalIndicators, string>;

export interface TickerMetricStoreFormat {
    metric: TechnicalIndicatorsKeys;
    field: MetricCalculableFields;
    value: number[];
    color: string;
    metricId: string;
    metricParams: MovingAverageProps;
}
export interface AddMetricValueType
    extends Omit<TickerMetricStoreFormat, 'metricParams' | 'color' | 'metricId'> {
    color?: string;
    metricId?: string;
    metricParams?: MovingAverageProps;
}

const formatAddMetricValueType = (props: {
    ticker: string;
    value: AddMetricValueType;
}): TickerMetricStoreFormat => {
    let entry: AddMetricValueType = props.value;
    // If metric does not exist, we will check for the parameters that do not exist and subsequently proceed to create the default values for each one of them.
    console.log(props.value, 'T');
    if (!entry.metricParams) {
        // Check if metric is accidentally created as a metric id or not
        if ((entry.metric as string).includes(indicatorIdDelimiter))
            throw Error(`Metric should contain the default delimiter ${indicatorIdDelimiter}`);
        entry.metricParams = technicalIndicatorsParams[entry.metric];
    }
    if (!entry.metricId) {
        // Creates a unique id by joining delimiter ids with the parameters provided to this parameter
        entry.metricId = `${
            props.ticker + indicatorIdDelimiter + props.value.metric + indicatorIdDelimiter
        }${Object.values(entry.metricParams).join(indicatorIdDelimiter)}`;
    }
    if (!entry.color) {
        entry.color = stringToColour(entry.metricId);
    }
    // We have now made all the fields compulsory/filled in
    return entry as TickerMetricStoreFormat;
};
interface AddMetricPropType {
    ticker: string;
    value: AddMetricValueType;
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
    setMetric: (props: AddMetricPropType) => void;
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
            console.log(props.value, 'A');
            const newEntry: TickerMetricStoreFormat = formatAddMetricValueType({
                ticker: props.ticker,
                value: props.value,
            });

            // Check if the metric with the same id already exists
            let metricExists = false;
            newMetrics[props.ticker].map(entry => {
                console.log(newEntry.metricId, entry.metricId, 'B');
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
                return { metrics: newMetrics };
            }
        }),
    setMetric: (props: AddMetricPropType) =>
        set((state: MetricStoreTypes) => {
            const newMetrics = { ...state.metrics };
            newMetrics[props.ticker] = newMetrics[props.ticker].map(
                (entry: TickerMetricStoreFormat) => {
                    if (entry.metric === props.value.metric) {
                        // metricParams must be present if the metrics is required to be replaced
                        const newEntry: TickerMetricStoreFormat = formatAddMetricValueType({
                            ticker: props.ticker,
                            value: props.value,
                        });
                        return newEntry;
                    }
                    return entry;
                }
            );
            return { metrics: newMetrics };
        }),
    removeMetric: (props: RemoveMetricPropType) =>
        set((state: MetricStoreTypes) => {
            const newMetrics = { ...state.metrics };
            newMetrics[props.ticker] = newMetrics[props.ticker].filter(
                (entry: TickerMetricStoreFormat) => entry.metricId !== props.metricId
            );
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
