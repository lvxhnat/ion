import { create } from 'zustand';

interface ChartConfigTypes {
    drawnLines?: any;
    setDrawnLines: (status?: any) => void;
}

// export const useChartConfigStore = create<ChartConfigTypes>(set => ({
//     drawnLines: undefined,
//     setDrawnLines: (status?: any) => {
//         set(() => ({ status }));
//     },
// }));
