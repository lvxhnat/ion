import { DefaultDataProps } from './schema/schema';

export interface LineChartProps {
    defaultData: DefaultDataProps;
    baseId: string;
    strokeWidth?: string;
    zeroAxis?: boolean;
    showPricing?: boolean;
    showAverage?: boolean;
    showLegend?: boolean;
    showGrid?: boolean;
    showAxis?: boolean;
    showNormalised?: boolean;
    showTooltip?: boolean;
    showMetrics?: boolean;
}
