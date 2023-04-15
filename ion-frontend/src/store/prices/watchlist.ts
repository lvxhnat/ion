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
interface EditLiveMovePropTypes {
    ticker: string;
    metric: string;
    value: number | null;
}

export interface EditLiveMoveTypes {
    liveMoves: {
        [ticker: string]: {
            [metric: string]: number | null;
        };
    };
    setLiveMoves: (props: EditLiveMovePropTypes) => void;
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
}
interface AddMetricPropType {
    ticker: string;
    value: TickerMetricStoreFormat;
}
interface RemoveMetricPropType {
    ticker: string;
    metric: string;
}
interface RemoveTickerPropType {
    ticker: string;
}
export interface MetricStoreTypes {
    metrics: {
        [ticker: string]: TickerMetricStoreFormat[];
    };
    addMetric: (props: AddMetricPropType) => void;
    removeMetric: (props: RemoveMetricPropType) => void;
    removeTicker: (props: RemoveTickerPropType) => void;
}
export const useMetricStore = create<MetricStoreTypes>(set => ({
    metrics: {},
    addMetric: (props: AddMetricPropType) =>
        set((state: MetricStoreTypes) => {
            const newMetrics = { ...state.metrics }; // Create a new metric object
            if (!Object.keys(newMetrics).includes(props.ticker)) {
                newMetrics[props.ticker] = [];
            }
            newMetrics[props.ticker].push(props.value);
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
}));
