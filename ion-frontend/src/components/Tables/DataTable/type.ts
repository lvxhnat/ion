import { Modify } from 'common/types';
import { IngestionDataType } from 'data/ingestion/ingestion';

export interface DataTableProps {
    data: UploadDataType;
    hideBasel?: boolean | undefined; // Show orange basels on top
    boldHeader?: boolean | undefined; // Make header bold
    stickyHeader?: boolean | undefined; // Make header sticky
    selectableCells?: boolean | undefined; // Allow selection of table cells
    rowCount?: number | undefined;
    pageSize?: number | undefined;
    rowsPerPage?: number | undefined;
    rowHeight?: number | undefined;
    defaultColumnWidth?: number | undefined;
}

export interface DataTableCellProps {
    id: string;
    selected?: boolean;
    onClick?: Function;
    children?: any;
    defaultColumnWidth?: number | undefined;
}

export interface DataTableHeaderProps extends DataTableProps {
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof any) => void;
    order: 'asc' | 'desc';
    orderBy: string;
    headerHeight?: number | undefined;
    setColumnSelect: Function;
}

export interface DataTableHeaderDefinition {
    id: string | number;
    headerName: string;
    sortable?: boolean;
    width?: number | undefined;
    description?: string | undefined;
}

// The data we store in our local state object
export type UploadDataType = Modify<
    IngestionDataType,
    {
        content_header: DataTableHeaderDefinition[];
        content_body: { id: number;[col: string]: any }[];
    }
>;
