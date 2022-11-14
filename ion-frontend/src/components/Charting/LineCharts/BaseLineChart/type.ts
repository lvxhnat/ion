export interface LineChartProps {
    defaultData: DefaultDataProps;
    baseId: string;
    data?: DataProps | null;
    width?: number;
    height?: number;
    margin?: {
        top: number;
        bottom: number;
        left: number;
        right: number;
    };
    zeroAxis?: boolean;
    showAverage?: boolean;
    showLegend?: boolean;
    showGrid?: boolean;
    showAxis?: boolean;
    showNormalised?: boolean;
    showTooltip?: boolean;
}

export interface DefaultDataProps {
    id: string;
    name: string;
    parent: boolean;
    dataX: Date[];
    dataY: number[];
    color: string;
    type: AllowedLineTypes;
}

export type AllowedLineTypes = 'line' | 'pureLine' | 'areaLine';

export type DataProps = DefaultDataProps[];
