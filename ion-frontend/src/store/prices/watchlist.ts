import { create } from 'zustand';

export interface WatchlistStoreTypes {
    gridSelected: [number, number];
    setGridSelected: (gridSelected: [number, number]) => void;
}

export const useWatchlistStore = create<WatchlistStoreTypes>(set => ({
    gridSelected: [0, 0],
    setGridSelected: (props: [number, number]) => set({ gridSelected: props }),
}));
