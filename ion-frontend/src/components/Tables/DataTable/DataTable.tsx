import * as React from 'react';
import * as S from './style';

import { DataTableHeaderDefinition, DataTableProps } from './type';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import DataTableHead from './DataTableHead';
import DataTableCell from './DataTableCell';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import TablePagination from '@mui/material/TablePagination';
import { useUploadPage } from 'store/table/table';

interface TableCellProps {
    [x: string]: any;
    children?: any;
    style?: React.CSSProperties;
}

export const StyledTableCell: React.FC<TableCellProps> = props => {
    return (
        <TableCell
            sx={{
                padding: 0,
                border: 0,
                ...props.style,
            }}
            {...props}
        >
            {props.children}
        </TableCell>
    );
};

function DataTableEnhancedHeader(props: {
    fileName: string;
    rowCount: number;
    rowsPerPage: number;
}) {
    const [page, setPage] = useUploadPage();
    const [rowsPerPage, setRowsPerPage] = React.useState<number>(props.rowsPerPage);

    return (
        <S.TableHeader>
            <S.LeftTableHeaderPanel>
                <Typography variant="subtitle1" align="left">
                    <strong>{props.fileName}</strong>
                </Typography>
            </S.LeftTableHeaderPanel>
            <S.RightTableHeaderPanel>
                <TablePagination
                    rowsPerPageOptions={[props.rowsPerPage, 50, 100, 150, 200]}
                    component="div"
                    count={props.rowCount}
                    rowsPerPage={props.rowsPerPage}
                    page={page}
                    onPageChange={(e: unknown, newPage: number) => {
                        setPage(newPage);
                    }}
                    onRowsPerPageChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setRowsPerPage(parseInt(e.target.value, 10));
                        setPage(0);
                    }}
                    sx={{
                        fontSize: `calc(0.5rem + 0.3vw)`,
                        '.MuiTablePagination-selectLabel': {
                            fontSize: `calc(0.5rem + 0.3vw)`,
                        },
                        '.MuiTablePagination-displayedRows': {
                            fontSize: `calc(0.5rem + 0.3vw)`,
                        },
                    }}
                />
            </S.RightTableHeaderPanel>
        </S.TableHeader>
    );
}

export default function DataTable(props: DataTableProps) {
    const [page] = useUploadPage();
    const [order, setOrder] = React.useState<'asc' | 'desc'>('asc');
    const [cellSelected, setCellSelected] = React.useState<string>('');
    const [columnSelected, setColumnSelected] = React.useState<number>();
    const [orderBy, setOrderBy] = React.useState<any>(props.data.content_body[0].id);

    const rowsPerPage = 25;

    function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    function getComparator<Key extends keyof any>(
        order: 'asc' | 'desc',
        orderBy: Key
    ): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }

    const handleRequestSort = (_: React.MouseEvent<unknown>, property: any) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    return (
        <>
            <DataTableEnhancedHeader
                rowCount={props.rowCount ?? props.data.content_body.length}
                fileName={props.data.file_name}
                rowsPerPage={rowsPerPage}
            />
            <S.StyledTableContainer>
                <Table stickyHeader={props.stickyHeader}>
                    <DataTableHead
                        {...props}
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                        setColumnSelect={setColumnSelected}
                    />
                    <TableBody>
                        {props.data.content_body
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .sort(getComparator(order, orderBy))
                            .map((row: { id: number; [col: string]: any }, row_index: number) => {
                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={`dataTableBody_${row_index}`}
                                        onClick={() =>
                                            props.rowOnClickFunctions
                                                ? props.rowOnClickFunctions(row.id.toString())
                                                : null
                                        }
                                        sx={{
                                            '&:hover': {
                                                cursor: props.rowOnClickFunctions
                                                    ? 'pointer'
                                                    : 'default',
                                            },
                                        }}
                                    >
                                        {props.data.content_header.map(
                                            (
                                                entry: DataTableHeaderDefinition,
                                                column_index: number
                                            ) => {
                                                if (props.selectableCells)
                                                    return (
                                                        <DataTableCell
                                                            id={`${row_index}-${column_index}`}
                                                            selected={
                                                                cellSelected ===
                                                                    `${row_index}-${column_index}` ||
                                                                columnSelected === column_index
                                                            }
                                                            onClick={() => {
                                                                setCellSelected(
                                                                    `${row_index}-${column_index}`
                                                                );
                                                            }}
                                                            key={`dataTableBody_${column_index}_${row_index}`}
                                                        >
                                                            {row[entry.headerName]}
                                                        </DataTableCell>
                                                    );
                                                else
                                                    return (
                                                        <DataTableCell
                                                            id={`${row_index}-${column_index}`}
                                                            key={`dataTableBody_${column_index}_${row_index}`}
                                                        >
                                                            {row[entry.headerName]}
                                                        </DataTableCell>
                                                    );
                                            }
                                        )}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </S.StyledTableContainer>
        </>
    );
}
