import * as React from 'react';
import { DataTableHeaderDefinition, DataTableHeaderProps } from './type';

import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import { visuallyHidden } from '@mui/utils';

import { StyledTableCell } from './DataTable';
import { ColorsEnum } from 'common/theme';
import { IngestionDtypeObjectType } from 'data/ingestion/ingestion';
import { typeIconHints } from 'common/theme/components/icons';

export default function DataTableHead(props: DataTableHeaderProps) {
    const [cellSelected, setCellSelected] = React.useState<number>();

    const { data, order, orderBy, onRequestSort } = props;
    const columns: DataTableHeaderDefinition[] = data.content_header;
    const columnWidth = props.defaultColumnWidth ? `${props.defaultColumnWidth}px` : '100px';

    const createSortHandler = (property: keyof any) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {columns.map((column: DataTableHeaderDefinition, index: number) => {
                    const allTypes: IngestionDtypeObjectType = props.data.dtypes[column.headerName];
                    const nullableTag: string = allTypes.nullable ? 'NULLABLE' : 'NOT NULLABLE';

                    return (
                        <StyledTableCell
                            key={column.id}
                            align="left"
                            sortDirection={orderBy === column.id ? order : false}
                            sx={{
                                width: columnWidth,
                                padding: '1px 3px',
                                backgroundColor:
                                    cellSelected === index ? ColorsEnum.darkGrey : ColorsEnum.black,
                            }}
                            onClick={() => {
                                props.setColumnSelect(index);
                                setCellSelected(index);
                            }}
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
                                style={{
                                    gap: 5,
                                    display: 'flex',
                                    alignItems: 'center',
                                    paddingTop: 5,
                                }}
                            >
                                {typeIconHints[allTypes.type_guessed]} {allTypes.type_guessed}
                            </Typography>
                            <Typography variant="subtitle2" style={{ color: ColorsEnum.coolgray1 }}>
                                {nullableTag}
                            </Typography>
                            <Tooltip title={column.headerName}>
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
            </TableRow>
        </TableHead>
    );
}
