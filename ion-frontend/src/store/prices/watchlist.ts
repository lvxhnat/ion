import { technicalIndicatorsParams } from 'components/Analysis/Chartview/calculations/metrics';
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
    metric: string;
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
            newLiveMoves[props.ticker][props.metric] = props.value;
            return { liveMoves: newLiveMoves };
        }),
    removeLiveMovesMetric: (props: RemoveLiveMoveMetricPropTypes) =>
        set((state: EditLiveMoveTypes) => {
            const newLiveMoves = { ...state.liveMoves };
            delete newLiveMoves[props.ticker][props.metric];
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
export interface TickerMetricStoreFormat {
    metric: string;
    field: MetricCalculableFields;
    value: number[];
    metricParams: MovingAverageProps;
}
interface AddMetricValueType extends Omit<TickerMetricStoreFormat, 'metricParams'> {
    metricParams?: MovingAverageProps;
}
interface AddMetricPropType {
    ticker: string;
    value: AddMetricValueType;
}
interface RemoveMetricPropType {
    ticker: string;
    metric: string;
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
    removeMetric: (props: RemoveMetricPropType) => void;
    removeTicker: (props: RemoveTickerPropType) => void;
    setselectedMetricId: (props: EditselectedMetricIdPropType) => void;
}
export const useMetricStore = create<MetricStoreTypes>(set => ({
    selectedMetricId: null,
    metrics: {},
    addMetric: (props: AddMetricPropType) =>
        set((state: MetricStoreTypes) => {
            const newMetrics = { ...state.metrics }; // Create a new metric object
            if (!Object.keys(newMetrics).includes(props.ticker)) {
                newMetrics[props.ticker] = [];
            }
            if (!props.value.metricParams) {
                const metricName = props.value.metric.split('__')[0];
                props.value.metricParams = technicalIndicatorsParams[metricName];
            }
            let metricExists = false;
            newMetrics[props.ticker].map(entry => {
                if (entry.metric === props.value.metric) {
                    metricExists = true;
                    return;
                }
            });
            if (!metricExists)
                // Cast to value since the field will now be filled in
                newMetrics[props.ticker] = [
                    ...newMetrics[props.ticker],
                    props.value as TickerMetricStoreFormat,
                ];

            return { metrics: newMetrics };
        }),
    removeMetric: (props: RemoveMetricPropType) =>
        set((state: MetricStoreTypes) => {
            const newMetrics = { ...state.metrics };
            newMetrics[props.ticker] = newMetrics[props.ticker].filter(
                (entry: TickerMetricStoreFormat) => entry.metric !== props.metric
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
