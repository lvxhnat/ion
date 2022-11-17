import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/system';
import { ColorsEnum } from 'common/theme';

export const SearchWrapper = styled('div')(({ theme }) => ({
    minWidth: '100px',
    [theme.breakpoints.down('sm')]: {
        minWidth: '100%',
        marginBottom: theme.spacing(2),
    },
}));

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
    backgroundColor: ColorsEnum.darkGrey,
    padding: `calc(${theme.spacing(0.5)} + 0.1vw)`,
}));
