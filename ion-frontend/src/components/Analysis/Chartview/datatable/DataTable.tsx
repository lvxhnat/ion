import * as S from './style';
import * as React from 'react';

import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import Typography from '@mui/material/Typography';
import TableSortLabel from '@mui/material/TableSortLabel';
import Tooltip from '@mui/material/Tooltip';
import { visuallyHidden } from '@mui/utils';

import { ColorsEnum } from 'common/theme';
import { formatDate } from 'common/constant/dates';

interface TableCellProps {
    [x: string]: any;
    children?: any;
    style?: React.CSSProperties;
}

export interface DataTableProps {
    data: any;
    columns: string[];
    boldHeader?: boolean | undefined;
    rowCount?: number | undefined;
    pageSize?: number | undefined;
    rowsPerPage?: number | undefined;
    rowHeight?: number | undefined;
}

export interface DataTableCellProps {
    id: string;
    backgroundColor?: string;
    onClick?: Function;
    children?: any;
}

export interface DataTableHeaderProps extends Omit<DataTableProps, 'data'> {
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof any) => void;
    order: 'asc' | 'desc';
    orderBy: string;
    headerHeight?: number | undefined;
}

export function DataTableCell(props: DataTableCellProps) {
    return (
        <StyledTableCell
            component="td"
            id="1"
            scope="row"
            align="center"
            onClick={props.onClick}
            sx={{
                padding: 0,
                '&.MuiTableCell-root': {
                    backgroundColor: props.backgroundColor,
                },
                borderBottom: `1px solid ${ColorsEnum.white}`,
                borderRight: `1px solid ${ColorsEnum.white}`,
            }}
        >
            <Typography variant="overline" noWrap>
                {props.children}
            </Typography>
        </StyledTableCell>
    );
}

export function DataTableHead(props: DataTableHeaderProps) {
    const { order, orderBy, onRequestSort } = props;

    const createSortHandler = (property: keyof any) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {props.columns.map((column: string, index: number) => {
                    let backgroundColor: string = ColorsEnum.black;
                    return (
                        <StyledTableCell
                            key={`dataTableHead_${column}_${index}`}
                            scope="row"
                            align="center"
                            sortDirection={orderBy === column ? order : false}
                            sx={{
                                padding: 0,
                                backgroundColor: backgroundColor,
                            }}
                        >
                            <Tooltip title={column}>
                                <TableSortLabel
                                    active={orderBy === column}
                                    direction={orderBy === column ? order : 'asc'}
                                    onClick={createSortHandler(column)}
                                >
                                    <Typography
                                        variant="overline"
                                        noWrap
                                        sx={{ fontWeight: props.boldHeader ? 'bold' : 600 }}
                                    >
                                        {column}
                                    </Typography>
                                    {orderBy === column ? (
                                        <Box sx={visuallyHidden}>
                                            {order === 'desc'
                                                ? 'sorted descending'
                                                : 'sorted ascending'}
                                        </Box>
                                    ) : null}
                                </TableSortLabel>
                            </Tooltip>
                        </StyledTableCell>
                    );
                })}
            </TableRow>
        </TableHead>
    );
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
    const [order, setOrder] = React.useState<'asc' | 'desc'>('asc');
    const [orderBy, setOrderBy] = React.useState<any>(props.columns[0]);

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
        <S.StyledTableContainer>
            <Table stickyHeader>
                <DataTableHead
                    columns={props.columns.filter(
                        (column: string) => column.toLowerCase() !== 'symbol'
                    )}
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                />
                <TableBody>
                    {props.data
                        .sort(getComparator(order, orderBy))
                        .map((row: { id: number; [col: string]: any }, row_index: number) => {
                            return (
                                <TableRow
                                    hover
                                    role="checkbox"
                                    tabIndex={-1}
                                    key={`dataTableBody_${row_index}`}
                                >
                                    {props.columns.map((column: string, column_index: number) => {
                                        let value = row[column];
                                        if (column === 'date') {
                                            value = formatDate(value);
                                        }
                                        if (column !== 'symbol') {
                                            let color = 'transparent';
                                            if (
                                                column !== 'date' &&
                                                props.data.length > row_index + 1
                                            ) {
                                                const diff: number =
                                                    value - props.data[row_index + 1][column];
                                                if (diff > 0) color = `${ColorsEnum.upHint}99`;
                                                else color = `${ColorsEnum.downHint}99`;
                                            }
                                            return (
                                                <DataTableCell
                                                    id={`${row_index}-${column_index}`}
                                                    key={`dataTableBody_${column_index}_${row_index}`}
                                                    backgroundColor={color}
                                                >
                                                    {value}
                                                </DataTableCell>
                                            );
                                        }
                                    })}
                                </TableRow>
                            );
                        })}
                </TableBody>
            </Table>
        </S.StyledTableContainer>
    );
}
