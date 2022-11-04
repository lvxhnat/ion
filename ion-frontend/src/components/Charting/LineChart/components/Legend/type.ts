import { IntRange } from "common/types";

export interface LegendHeaderType {
    name: string, 
    index: string | number, 
    width: IntRange<0, 100>
}

export type StyledTableCellProps = {
    children?: React.ReactNode,
    isHeader?: boolean,
    width?: string,
}