import { styled } from '@mui/system';
import TableContainer from '@mui/material/TableContainer';

export const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
    width: '100%',
    maxHeight: '75vh',
    overflowY: 'scroll',
    '&::-webkit-scrollbar': { width: 0 },
}));
