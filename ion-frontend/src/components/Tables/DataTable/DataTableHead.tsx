import * as React from 'react';
import { DataTableHeaderDefinition, DataTableHeaderProps } from './type';

import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableSortLabel from '@mui/material/TableSortLabel';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import { visuallyHidden } from '@mui/utils';
import AbcIcon from '@mui/icons-material/Abc';

import { StyledTableCell } from './DataTable';
import { ColorsEnum } from 'common/theme';

export default function DataTableHead(props: DataTableHeaderProps) {
    const { columns, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
        props;
    const columnWidth = props.defaultColumnWidth ? `${props.defaultColumnWidth}px` : '100px';

    const createSortHandler = (property: keyof any) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <StyledTableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        size="small"
                    />
                </StyledTableCell>
                {columns.map((column: DataTableHeaderDefinition) => (
                    <StyledTableCell
                        key={column.id}
                        align="left"
                        sortDirection={orderBy === column.id ? order : false}
                        sx={{ width: columnWidth, padding: '1px 5px' }}
                    >
                        <div
                            style={{
                                width: '100%',
                                height: 3,
                                backgroundColor: ColorsEnum.beer,
                            }}
                        />
                        <AbcIcon fontSize="small" sx={{ padding: 0 }} />
                        <Tooltip title={column.headerName} sx={{ padding: 0 }}>
                            <TableSortLabel
                                active={orderBy === column.id}
                                direction={orderBy === column.id ? order : 'asc'}
                                onClick={createSortHandler(column.id)}
                                sx={{ width: columnWidth }}
                            >
                                <Typography variant="subtitle2" noWrap>
                                    {column.headerName}
                                </Typography>
                                {orderBy === column.id ? (
                                    <Box sx={visuallyHidden}>
                                        {order === 'desc'
                                            ? 'sorted descending'
                                            : 'sorted ascending'}
                                    </Box>
                                ) : null}
                            </TableSortLabel>
                        </Tooltip>
                    </StyledTableCell>
                ))}
                {columns ? (
                    <StyledTableCell
                        sx={{ width: `calc(100% - ${columns.length + 1} * ${columnWidth})` }}
                    />
                ) : null}
            </TableRow>
        </TableHead>
    );
}
