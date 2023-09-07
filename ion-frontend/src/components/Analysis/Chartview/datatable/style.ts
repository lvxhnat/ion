import { styled } from '@mui/system';
import TableContainer from '@mui/material/TableContainer';

export const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
    width: '100%',
    height: '100%',
    overflow: 'scroll',
    '&::-webkit-scrollbar': { width: 0 },
}));

export const TableHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 10,
    width: '100%',
}));

export const LeftTableHeaderPanel = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
}));

export const RightTableHeaderPanel = styled('div')(({ theme }) => ({
    display: 'flex',
    width: '100%',
    justifyContent: 'flex-end',
}));
