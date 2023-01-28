import * as React from 'react';
import * as S from './style';

import { DataTableHeaderDefinition, DataTableProps } from './type';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import DataTableHead from './DataTableHead';
import Box from '@mui/material/Box';
import DataTableCell from './DataTableCell';
import Skeleton from '@mui/material/Skeleton';
import DataTableEnhancedHeader from './DataTableEnhancedHeader';
import { useUploadPage } from 'store/customanalysis/customanalysis';

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

export function DataTableSkeleton() {
    return (
        <>
            <S.TableHeader>
                <Skeleton variant="rectangular" width={'100%'} height={''} animation="wave" />
            </S.TableHeader>
            <S.StyledTableContainer>
                <Skeleton variant="rectangular" width={'100%'} height={'100%'} animation="wave" />
            </S.StyledTableContainer>
        </>
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
                                    >
                                        {props.data.content_header.map(
                                            (
                                                entry: DataTableHeaderDefinition,
                                                column_index: number
                                            ) => {
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
