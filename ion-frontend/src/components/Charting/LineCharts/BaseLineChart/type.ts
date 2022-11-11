export interface LineChartProps {
    dataX: string[];
    dataY: number[];
    data?: number[] | null;
    width?: number;
    height?: number;
    margin?: {
        top: number;
        bottom: number;
        left: number;
        right: number;
    };
    timeParseFormat?: string;
    showAverage?: boolean;
    showGrid?: boolean;
    showAxis?: boolean;
    showArea?: boolean;
    showNormalised?: boolean;
    showTooltip?: boolean;
}
