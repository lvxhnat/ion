export interface DefaultDataProps {
    id: string;
    name: string;
    parent: boolean;
    dataX: Date[];
    dataY: number[] | OHLCDataSchema[];
    color: string;
    type: AllowedLineTypes;
}

export type AllowedLineTypes = 'line' | 'pureLine' | 'areaLine' | 'candleStick' | 'barStick';

export interface OHLCDataSchema {
    date: Date;
    open: number;
    high: number;
    low: number;
    close: number;
}
