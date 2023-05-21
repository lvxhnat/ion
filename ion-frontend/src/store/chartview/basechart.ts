import * as d3 from 'd3';
import { create } from 'zustand';

export interface ChartStoreTypes {
    charts: { [baseId: string]: ChartConfigs };
    setChartConfigs: (props: ChartConfigProps) => void;
}
interface ChartConfigs {
    x: d3.ScaleTime<number, number, never>,
    y: d3.ScaleLinear<number, number, never>,
    dataX: Date[];
}
interface ChartConfigProps {
    baseId: string;
    configs: ChartConfigs;
}

export const useBaseChartStore = create<ChartStoreTypes>(set => ({
    charts: {},
    setChartConfigs: (props: ChartConfigProps) => {
        set((state: ChartStoreTypes) => {
            return { charts: { ...state.charts, [props.baseId]: props.configs } };
        });
    },
}));