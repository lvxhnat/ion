import { styled } from '@mui/system';
import { ColorsEnum } from 'common/theme';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';

export const TableCellWrapper = styled(TableCell)(({ theme }) => ({
    padding: `${theme.spacing(0.5)} ${theme.spacing(0.5)}`,
    border: 0,
}));

export const StyledSearch = styled('input')(({ theme }) => ({
    fontSize: `calc(0.7rem + 0.2vw)`,
    backgroundColor: 'transparent',
    padding: theme.spacing(0.5),
    border: `0.5px solid ${theme.palette.mode === 'dark' ? ColorsEnum.white : ColorsEnum.black}`,
    color: theme.palette.mode === 'dark' ? ColorsEnum.white : ColorsEnum.black,
    outline: 'none',
}));

export const SearchWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0.5),
}));

export const TableHeaderWrapper = styled(Typography)(({ theme }) => ({
    paddingTop: `calc(0.1rem + 0.3vh)`,
    paddingLeft: `calc(0.1rem + 0.5vw)`,
}));

export const TableRowWrapper = styled(TableRow)(({ theme }) => ({
    display: 'block',
    '&:hover': {
        backgroundColor: 'rgb(3, 37, 76, 0.8) !important',
    },
}));

export const TableWrapper = styled(Table)(({ theme }) => ({
    zIndex: 999,
    width: `calc(500px + 5vw)`,
    position: 'absolute',
    border: `1px solid ${ColorsEnum.warmgray1}`,
    backgroundColor: theme.palette.mode === 'dark' ? ColorsEnum.darkGrey : ColorsEnum.black,
}));
