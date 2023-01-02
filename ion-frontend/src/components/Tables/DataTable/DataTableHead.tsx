import * as React from 'react';
import { DataTableHeaderDefinition, DataTableHeaderProps, UploadColumnTypes } from './type';

import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableSortLabel from '@mui/material/TableSortLabel';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import { visuallyHidden } from '@mui/utils';

import AbcIcon from '@mui/icons-material/Abc';
import TagIcon from '@mui/icons-material/Tag';
import DateRangeIcon from '@mui/icons-material/DateRange';
import FilterNoneIcon from '@mui/icons-material/FilterNone';

import { StyledTableCell } from './DataTable';
import { ColorsEnum } from 'common/theme';
import { IngestionDtypeObjectType } from 'data/ingestion/ingestion';

const typeIconHints: { [column in UploadColumnTypes]: React.ReactElement } = {
    BLANK: <FilterNoneIcon fontSize="inherit" sx={{ padding: 0 }} />,
    DATETIME: <DateRangeIcon fontSize="inherit" sx={{ padding: 0 }} />,
    FLOAT: <TagIcon fontSize="inherit" sx={{ padding: 0 }} />,
    INT: <TagIcon fontSize="inherit" sx={{ padding: 0 }} />,
    TEXT: <AbcIcon fontSize="inherit" sx={{ padding: 0 }} />,
};

export default function DataTableHead(props: DataTableHeaderProps) {
    const { data, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const columns: DataTableHeaderDefinition[] = data.content_header;
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
                {columns.map((column: DataTableHeaderDefinition) => {
                    const allTypes: IngestionDtypeObjectType = props.data.dtypes[column.headerName];
                    const nullableTag: string = allTypes.nullable
                        ? `NULLABLE (${(
                              (100 * allTypes.types['BLANK']) /
                              Object.values(allTypes.types).reduce((a, b) => a + b, 0)
                          ).toFixed(1)}%)`
                        : 'NOT NULLABLE';

                    return (
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
                            <Typography
                                variant="subtitle2"
                                align="center"
                                style={{ color: ColorsEnum.coolgray1, paddingTop: 5 }}
                            >
                                {nullableTag}
                            </Typography>
                            <Typography
                                variant="subtitle2"
                                align="center"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: 5,
                                }}
                            >
                                {typeIconHints[allTypes.type_guessed]} {allTypes.type_guessed}
                            </Typography>
                            <Tooltip title={column.headerName} sx={{ padding: 0 }}>
                                <TableSortLabel
                                    active={orderBy === column.id}
                                    direction={orderBy === column.id ? order : 'asc'}
                                    onClick={createSortHandler(column.id)}
                                    sx={{ width: columnWidth, gap: 1 }}
                                >
                                    <Typography variant="subtitle1" noWrap>
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
                    );
                })}
                {columns ? (
                    <StyledTableCell
                        sx={{ width: `calc(100% - ${columns.length + 1} * ${columnWidth})` }}
                    />
                ) : null}
            </TableRow>
        </TableHead>
    );
}
