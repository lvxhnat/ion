import { styled } from '@mui/system';
import { ColorsEnum } from 'common/theme';

export const GridSelectorContainer = styled('div')(({ theme }) => ({
    backgroundColor: 'transparent',
    '&:hover': {
        backgroundColor: theme.palette.mode === 'dark' ? ColorsEnum.darkGrey : ColorsEnum.lightLime,
    },
}));
