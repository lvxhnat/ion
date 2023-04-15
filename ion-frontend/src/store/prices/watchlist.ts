import { DefaultDataProps } from 'components/Charting/BaseChart/schema/schema';
import { create } from 'zustand';
import { technicalIndicators } from 'components/Analysis/Chartview/calculations/metrics';
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
 * Stores the live data as the cursor is moving around the chart, to be able to show as some form of tooltip
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
 * Controls the metrics that is able to be seen on the grid view on each ticker
 */
export type AllowedMetricCategories = 'price' | 'lower' | 'volume';
interface EditMetricPropType {
    ticker: string;
    metrics: {
        type: AllowedMetricCategories;
        metric: string; // Format is technicalIndicators_PARAMS
    } | null;
}

export interface MetricStoreTypes {
    metrics: {
        [ticker: string]: {
            price: string[];
            volume: string[];
            lower: string[];
        };
    };
    removeMetric: (props: EditMetricPropType) => void;
    addMetric: (props: EditMetricPropType) => void;
}

export const useMetricStore = create<MetricStoreTypes>(set => ({
    metrics: {},
    removeMetric: (props: EditMetricPropType) => {
        set((state: MetricStoreTypes) => {
            const newMetrics = { ...state.metrics };
            if (props.metrics) {
                newMetrics[props.ticker][props.metrics.type] = newMetrics[props.ticker][
                    props.metrics.type
                ].filter(indicator => indicator !== props.metrics!.metric);
            }
            return { metrics: newMetrics };
        });
    },
    addMetric: (props: EditMetricPropType) => {
        set((state: MetricStoreTypes) => {
            if ((props.ticker && props.metrics === null) || !state.metrics[props.ticker]) {
                state.metrics[props.ticker] = {
                    price: [],
                    volume: [],
                    lower: [],
                };
                return { metrics: { ...state.metrics } };
            } else {
                // Deep copy nested object
                const newMetrics = { ...state.metrics };
                newMetrics[props.ticker][props.metrics!.type] = [
                    ...newMetrics[props.ticker][props.metrics!.type],
                    props.metrics!.metric,
                ];
                return { metrics: newMetrics };
            }
        });
    },
}));
