import * as React from 'react';
import * as S from './style';

import { DataTableHeaderDefinition, DataTableProps } from './type';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import DataTableHead from './DataTableHead';
import Typography from '@mui/material/Typography';
import TablePagination from '@mui/material/TablePagination';
import Box from '@mui/material/Box';
import DataTableCell from './DataTableCell';

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

export default function DataTable(props: DataTableProps) {
    const [page, setPage] = React.useState(0);
    const [order, setOrder] = React.useState<'asc' | 'desc'>('asc');
    const [cellSelected, setCellSelected] = React.useState<string>('');
    const [selected, setSelected] = React.useState<readonly number[]>([]);
    const [orderBy, setOrderBy] = React.useState<any>(props.data.content_body[0].id);

    const [rowsPerPage, setRowsPerPage] = React.useState<number>(
        props.rowsPerPage ? props.rowsPerPage : 25
    );

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

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelected = props.data.content_body.map(n => n.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleRequestSort = (_: React.MouseEvent<unknown>, property: any) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    return (
        <Box>
            <S.StyledTableContainer>
                <Table stickyHeader={props.stickyHeader}>
                    <DataTableHead
                        {...props}
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={props.data.content_body.length}
                    />
                    <TableBody>
                        {props.data.content_body
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .sort(getComparator(order, orderBy))
                            .map((row: { id: number; [col: string]: any }, row_index: number) => (
                                <TableRow
                                    hover
                                    role="checkbox"
                                    tabIndex={-1}
                                    key={`dataTableBody_${row_index}`}
                                >
                                    <StyledTableCell
                                        align="left"
                                        padding="checkbox"
                                        key={`dataTableBody_checkBox_${row_index}`}
                                    >
                                        <Checkbox
                                            color="primary"
                                            checked={selected.includes(row.id)}
                                            onChange={() => {
                                                if (selected.includes(row.id))
                                                    setSelected(
                                                        selected.filter(id => id !== row.id)
                                                    );
                                                else setSelected([...selected, row.id]);
                                            }}
                                            size="small"
                                        />
                                    </StyledTableCell>
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
                                                        `${row_index}-${column_index}`
                                                    }
                                                    onClick={() => {
                                                        setCellSelected(
                                                            `${row_index}-${column_index}`
                                                        );
                                                    }}
                                                    key={`dataTableBody_${entry.headerName}_${row_index}`}
                                                >
                                                    {row[entry.headerName]}
                                                </DataTableCell>
                                            );
                                        }
                                    )}
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </S.StyledTableContainer>
            <TablePagination
                rowsPerPageOptions={[50, 100, 150, 200]}
                component="div"
                count={props.data.content_body.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={(e: unknown, newPage: number) => setPage(newPage)}
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
        </Box>
    );
}
