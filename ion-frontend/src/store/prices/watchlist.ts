import { DefaultDataProps } from 'components/Charting/BaseChart/schema/schema';
import { create } from 'zustand';

export interface WatchlistStoreTypes {
    gridSelected: [number, number];
    setGridSelected: (gridSelected: [number, number]) => void;
}

export const useWatchlistStore = create<WatchlistStoreTypes>(set => ({
    gridSelected: [0, 0],
    setGridSelected: (props: [number, number]) => set({ gridSelected: props }),
}));

export interface TickerDataStoreTypes {
    data: {
        [ticker: string]: DefaultDataProps
    };
    setData: (props: { ticker: string, data: DefaultDataProps }) => void;
}

export const useTickerDataStore = create<TickerDataStoreTypes>(set => ({
    data: {},
    setData: (props: {
        ticker: string,
        data: DefaultDataProps
    }) => set((state: TickerDataStoreTypes) => {
        return {
            data: {
                ...state.data,
                [props.ticker]: props.data
            }
        }
    }),
}));

