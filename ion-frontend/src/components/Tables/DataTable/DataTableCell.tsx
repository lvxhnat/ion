import * as React from 'react';
import * as S from './style';

import { DataTableCellProps } from './type';

import Typography from '@mui/material/Typography';
import { StyledTableCell } from './DataTable';
import { ColorsEnum } from 'common/theme';

export default function DataTableCell(props: DataTableCellProps) {
    return (
        <StyledTableCell
            component="td"
            id="1"
            scope="row"
            align="left"
            onClick={props.onClick}
            sx={{
                '&.MuiTableCell-root': {
                    backgroundColor: props.selected ? ColorsEnum.darkGrey : 'default',
                },
                padding: 1,
            }}
        >
            <Typography
                variant="subtitle2"
                noWrap
                style={{
                    width: props.defaultColumnWidth ? `${props.defaultColumnWidth}px` : '100px',
                }}
            >
                {props.children}
            </Typography>
        </StyledTableCell>
    );
}
