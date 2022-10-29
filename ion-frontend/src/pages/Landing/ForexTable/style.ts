import { styled } from '@mui/system';
import { alpha, TableRow } from '@mui/material';
import Typography from '@mui/material/Typography';

import { ColorsEnum } from 'common/theme';

export const TableCellLabel = styled(Typography, {
    shouldForwardProp: prop => prop !== 'isHeader',
})<{
    isHeader?: boolean;
}>(({ theme, isHeader }) => ({
    color: alpha(theme.palette.mode === 'light' ? ColorsEnum.black : ColorsEnum.beer, 1),
    fontSize: '12px',
    fontWeight: isHeader ? 'bold' : 'default',
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));