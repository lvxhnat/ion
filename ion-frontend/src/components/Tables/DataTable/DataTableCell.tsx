import * as React from 'react';
import * as S from './style';

import { DataTableCellProps } from './type';

import Typography from '@mui/material/Typography';
import { StyledTableCell } from './DataTable';

export default function DataTableCell(props: DataTableCellProps) {
    return (
        <StyledTableCell
            component="td"
            id="1"
            scope="row"
            align="left"
            padding="none"
            onClick={props.onClick}
            sx={{
                '&.MuiTableCell-root': {
                    outline: props.selected ? '1px solid rgba(224, 224, 224, 1)' : 'none',
                },
                paddingLeft: 1,
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
