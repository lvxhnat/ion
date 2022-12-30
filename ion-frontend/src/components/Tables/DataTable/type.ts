export interface DataTableProps {
    rows: readonly DataTableRowDefinition[];
    columns: DataTableHeaderDefinition[];
    stickyHeader?: boolean | undefined;
    pageSize?: number | undefined;
    rowsPerPage?: number | undefined;
    rowHeight?: number | undefined;
    defaultColumnWidth?: number | undefined;
}

interface DataTableRowDefinition {
    id: string;
    [column: string]: any;
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
