import { ChartTypes } from 'components/Charting/BaseChart/type';
import * as d3 from 'd3';
import { create } from 'zustand';

export interface ChartStoreTypes {
    charts: { [ticker: string]: ChartConfigs };
    setChartConfigs: (props: ChartConfigProps) => void;
    addChartPlot: (props: AddChartPlotProps) => void;
}

interface ChartConfigProps {
    ticker: string;
    configs: ChartConfigs;
}

interface ChartConfigs {
    x: d3.ScaleTime<number, number, never>;
    y: d3.ScaleLinear<number, number, never>;
    dataX: Date[];
    color: string;
    type: ChartTypes;
    plots: PlotType[];
    draw?: boolean;
}

interface PlotType {
    baseId: string;
    ticker: string;
    color: string;
    type: ChartTypes;
    draw?: boolean;
}

interface AddChartPlotProps {
    parentTicker: string;
    plot: PlotType;
}

export const useBaseChartStore = create<ChartStoreTypes>(set => ({
    charts: {},
    setChartConfigs: (props: ChartConfigProps) => {
        set((state: ChartStoreTypes) => {
            return { charts: { ...state.charts, [props.ticker]: props.configs } };
        });
    },
    addChartPlot: (props: AddChartPlotProps) => {
        set((state: ChartStoreTypes) => {
            const newConfigs = state.charts[props.parentTicker];
            if (newConfigs) {
                newConfigs.plots = [...newConfigs.plots, props.plot];
                return {
                    charts: { ...state.charts, [props.parentTicker]: { ...newConfigs } },
                };
            } else
                return {
                    charts: state.charts,
                };
        });
    },
}));
