import { DefaultDataProps } from './schema/schema';

export interface LineChartProps {
    defaultData: DefaultDataProps;
    baseId: string;
    strokeWidth?: string;
    zeroAxis?: boolean;
    showAverage?: boolean;
    showLegend?: boolean;
    showGrid?: boolean;
    showAxis?: boolean;
    showTooltip?: boolean;
    showEndTags?: boolean;
    normalise?: boolean;
}

export type ChartTypes = 'line' | 'area' | 'ohlc';
