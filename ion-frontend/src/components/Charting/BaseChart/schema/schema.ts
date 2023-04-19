export interface DefaultDataProps {
    id: string;
    name: string;
    parent: boolean;
    dataX: Date[];
    dataY: number[];
    color: string;
    type: AllowedLineTypes;
}
export const AllowedLineTypeList = ['line', 'pureLine', 'areaLine', 'candleStick', 'barStick'];
export type AllowedLineTypes = 'line' | 'pureLine' | 'areaLine' | 'candleStick' | 'barStick';
