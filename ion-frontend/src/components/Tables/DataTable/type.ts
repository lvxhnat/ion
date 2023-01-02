import { Modify } from 'common/types';
import { IngestionDataType } from 'data/ingestion/ingestion';

export interface DataTableProps {
    data: UploadDataType;
    stickyHeader?: boolean | undefined;
    pageSize?: number | undefined;
    rowsPerPage?: number | undefined;
    rowHeight?: number | undefined;
    defaultColumnWidth?: number | undefined;
}

export interface DataTableCellProps {
    id: string;
    selected: boolean;
    onClick: Function;
    children?: any;
    defaultColumnWidth?: number | undefined;
}

export interface DataTableHeaderProps extends DataTableProps {
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof any) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: 'asc' | 'desc';
    orderBy: string;
    rowCount: number;
    headerHeight?: number | undefined;
}

export interface DataTableHeaderDefinition {
    id: string | number;
    headerName: string;
    sortable?: boolean;
    width?: number | undefined;
    description?: string | undefined;
}

// The data we store in our local state object
export type UploadColumnTypes = 'DATETIME' | 'INT' | 'TEXT' | 'FLOAT' | 'BLANK';
export type UploadDataType = Modify<
    IngestionDataType,
    {
        content_header: DataTableHeaderDefinition[];
        content_body: { id: number; [col: string]: any }[];
    }
>;
