import { IntRange } from 'common/types';

export interface ForexTableDataType {
    instrument: string
    closeoutBid: number
    closeoutAsk: number
    spread: number
}

export interface FormattedForexDataType extends ForexTableDataType {
    bid_change?: -1 | 0 | 1
    ask_change?: -1 | 0 | 1
}

export type StyledTableCellProps = {
    children?: React.ReactNode,
    isHeader?: boolean,
    width?: string
}

export interface ForexTableHeaderType {
    name: keyof ForexTableDataType
    index: string 
    width?: IntRange<0,100> 
}