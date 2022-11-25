import { OHLCDataSchema } from 'data/schema/forex';

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
