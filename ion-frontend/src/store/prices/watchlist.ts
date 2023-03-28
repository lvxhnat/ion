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
 * Stores the ticker data that is shown on the grid
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
 * Controls the metrics that is able to be seen on the grid view on each ticker
 */
export type AllowedMetricCategories = 'price' | 'lower' | 'volume';
export interface MetricStoreTypes {
    metrics: {
        [ticker: string]: {
            price: string[];
            volume: string[];
            lower: string[];
        };
    };
    setMetrics: (props: {
        ticker: string;
        metrics: {
            type: AllowedMetricCategories;
            metric: string;
        } | null;
    }) => void;
}

export const useMetricStore = create<MetricStoreTypes>(set => ({
    metrics: {},
    setMetrics: (props: {
        ticker: string;
        metrics: {
            type: AllowedMetricCategories;
            metric: string;
        } | null;
    }) =>
        set((state: MetricStoreTypes) => {
            if ((props.ticker && props.metrics === null) || !state.metrics[props.ticker]) {
                state.metrics[props.ticker] = {
                    price: [],
                    volume: [],
                    lower: [],
                };
            } else {
                state.metrics[props.ticker][props.metrics!.type] = [
                    ...state.metrics[props.ticker][props.metrics!.type],
                    props.metrics!.metric,
                ];
            }

            return {
                metrics: { ...state.metrics },
            };
        }),
}));
