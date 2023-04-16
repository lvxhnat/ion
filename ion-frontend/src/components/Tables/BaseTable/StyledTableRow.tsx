import { styled } from '@mui/system';

import TableRow from '@mui/material/TableRow';
import { ColorsEnum } from 'common/theme';

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
    '&:hover': {
        cursor: 'pointer',
        backgroundColor: ColorsEnum.coolgray1,
    },
}));
