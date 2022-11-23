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

export interface ChartDataSchema {

}