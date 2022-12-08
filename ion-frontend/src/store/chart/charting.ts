import { AllowedLineTypes } from 'components/Charting/BaseChart/schema/schema';
import create from 'zustand';

interface ChartStoreTypes {
    chartType: AllowedLineTypes;
    setChartType: (config: ChartStoreProps) => void;
}

interface ChartStoreProps {
    chartType: AllowedLineTypes;
}

export const useChartStore = create<ChartStoreTypes>(set => ({
    chartType: 'barStick',
    setChartType: (props: ChartStoreProps) => set({ chartType: props.chartType }),
}));
