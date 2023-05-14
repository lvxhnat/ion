import { styled } from '@mui/system';
import { ColorsEnum } from 'common/theme';

export const MainWrapper = styled('div')(({ theme }) => ({
    display: 'flex',
    gap: 15,
    '&:hover': {
        cursor: 'pointer',
    },
}));

export const SubWrappers = styled('div')(({ theme }) => ({
    display: 'flex',
}));

export const HoveredLink = styled('div')(({ theme }) => ({
    padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
    borderRadius: 10,
    '&:hover': {
        backgroundColor: ColorsEnum.darkGrey,
        cursor: 'pointer',
    },
}));
