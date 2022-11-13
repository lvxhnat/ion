import { IntRange } from 'common/types';

export interface ForexStreamType {
    instrument: string;
    closeoutBid: number;
    closeoutAsk: number;
    spread: number;
}

export interface ForexHistoricalType {
    date: Date;
    value: number;
}

export interface FormattedForexStreamType extends ForexStreamType {
    bid_change?: -1 | 0 | 1;
    ask_change?: -1 | 0 | 1;
}

export interface StyledTableCellProps {
    children?: React.ReactNode;
    isHeader?: boolean;
    width?: string;
}

export interface ForexTableHeaderType {
    name: string;
    id: keyof ForexStreamType;
    width?: IntRange<0, 100>;
}
