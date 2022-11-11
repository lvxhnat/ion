export interface LineChartProps {
    defaultData: DefaultDataProps;
    data?: DataProps | null;
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
    showNormalised?: boolean;
    showTooltip?: boolean;
}

export interface DefaultDataProps {
    id: string;
    name: string;
    dataX: string[];
    dataY: number[];
    color: string;
    type: AllowedLineTypes;
}

export type AllowedLineTypes = 'line' | 'areaLine';

type DataProps = DefaultDataProps[];
