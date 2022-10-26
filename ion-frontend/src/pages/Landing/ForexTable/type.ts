import { IntRange } from "common/types"

export interface ForexTableDataType {
    instrument: string
    closeoutBid: number
    closeoutAsk: number
}

export type StyledTableCellProps = {
    children?: React.ReactNode,
    isHeader?: boolean,
    [x: string]: any, // Spread rest of props
}

export interface ForexTableHeaderType {
    name: keyof ForexTableDataType
    index: string 
    width?: IntRange<0,100> 
}