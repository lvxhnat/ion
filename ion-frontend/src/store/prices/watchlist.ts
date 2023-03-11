import create from 'zustand';

export interface WatchlistStoreTypes {}

export const WatchlistStore = create<WatchlistStoreTypes>(set => ({
    forexStream: {},
    setForexStream: () => null,
}));
