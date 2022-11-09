import { IntRange } from 'common/types';

export interface LegendHeaderType {
    name: string;
    index: string | number;
    width: IntRange<0, 100>;
}

export type StyledTableCellProps = {
    children?: React.ReactNode;
    isHeader?: boolean;
    colSpan?: number;
    width?: string;
    isText?: boolean;
};

export type LegendProps = Array<LegendDataType>;

export interface LegendDataType {
    name: string;
    color: string;
    f: React.MouseEventHandler<HTMLButtonElement>;
    indicators: Array<{
        name: string;
        color: string;
        f: React.MouseEventHandler<HTMLButtonElement>;
    }>;
}
