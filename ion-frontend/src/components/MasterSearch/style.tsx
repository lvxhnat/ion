import { styled } from '@mui/system';
import { ColorsEnum } from 'common/theme';
import Table from '@mui/material/Table';

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

export const TableWrapper = styled(Table)(({ theme }) => ({
    zIndex: 999,
    width: 700,
    position: 'absolute',
    backgroundColor: theme.palette.mode === 'dark' ? ColorsEnum.warmgray1 : ColorsEnum.black,
}));
