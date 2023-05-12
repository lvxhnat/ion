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
import { IngestionDtypeObjectType } from 'endpoints/clients/ingestion';
import { typeIconHints } from 'common/theme/components/icons';
import { useThemeStore } from 'store/theme';

export default function DataTableHead(props: DataTableHeaderProps) {
    const { mode } = useThemeStore();
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
                    const allTypes: IngestionDtypeObjectType | undefined = props.data.dtypes
                        ? props.data.dtypes[column.headerName]
                        : undefined;
                    let nullableTag: string | undefined;

                    if (allTypes) {
                        nullableTag = allTypes.nullable ? 'NULLABLE' : 'NOT NULLABLE';
                    }

                    let backgroundColor: string = ColorsEnum.white;
                    if (mode === 'dark') {
                        if (cellSelected === index && props.selectableCells)
                            backgroundColor = ColorsEnum.darkGrey;
                        else backgroundColor = ColorsEnum.black;
                    }

                    return (
                        <StyledTableCell
                            key={`dataTableHead_${column.id}_${index}`}
                            align="left"
                            sortDirection={orderBy === column.id ? order : false}
                            sx={{
                                width: columnWidth,
                                padding: '1px 3px',
                                backgroundColor: backgroundColor,
                            }}
                            onClick={() => {
                                if (props.selectableCells) {
                                    props.setColumnSelect(index);
                                    setCellSelected(index);
                                }
                            }}
                        >
                            {!props.hideBasel ? (
                                <div
                                    style={{
                                        width: '100%',
                                        height: 3,
                                        backgroundColor: ColorsEnum.beer,
                                    }}
                                />
                            ) : null}
                            <Typography
                                variant="subtitle2"
                                style={{
                                    gap: 5,
                                    display: 'flex',
                                    fontWeight: props.boldHeader ? 'bold' : 600,
                                    alignItems: 'center',
                                    paddingTop: 5,
                                }}
                            >
                                {allTypes ? typeIconHints[allTypes.type_guessed] : null}
                                {allTypes ? allTypes.type_guessed : null}
                            </Typography>
                            <Typography
                                variant="subtitle2"
                                style={{
                                    color: ColorsEnum.coolgray1,
                                    fontWeight: props.boldHeader ? 'bold' : 600,
                                }}
                            >
                                {nullableTag}
                            </Typography>
                            <Tooltip title={column.headerName}>
                                <TableSortLabel
                                    active={orderBy === column.id}
                                    direction={orderBy === column.id ? order : 'asc'}
                                    onClick={createSortHandler(column.id)}
                                    sx={{ width: columnWidth, gap: 1 }}
                                >
                                    <Typography
                                        variant="subtitle1"
                                        noWrap
                                        sx={{ fontWeight: props.boldHeader ? 'bold' : 600 }}
                                    >
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
