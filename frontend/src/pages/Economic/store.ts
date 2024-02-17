import { create } from 'zustand';

/**
 * Stores the ticker Chartdata that is shown on the grid (i.e. The ticker time series)
 */
export interface ChartDataStoreTypes {
    chartData: [number, number][];
    loading: boolean;
    setChartData: (chartData: [number, number][]) => void;
    setLoading: (loading: boolean) => void;
}

export const useChartDataStore = create<ChartDataStoreTypes>(set => ({
    chartData: [],
    loading: false,
    setChartData: (chartData: [number, number][]) => set({ chartData: chartData }),
    setLoading: (loading: boolean) => set({ loading: loading }),
}));
