import { DefaultDataProps } from './schema/schema';

export interface LineChartProps {
    defaultData: DefaultDataProps;
    baseId: string;
    data?: DefaultDataProps[];
    width?: number;
    height?: number;
    margin?: {
        top: number;
        bottom: number;
        left: number;
        right: number;
    };
    strokeWidth?: string;
    zeroAxis?: boolean;
    showAverage?: boolean;
    showLegend?: boolean;
    showGrid?: boolean;
    showAxis?: boolean;
    showNormalised?: boolean;
    showTooltip?: boolean;
}
