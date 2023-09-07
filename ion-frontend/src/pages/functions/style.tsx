import { styled } from '@mui/system';
import { ColorsEnum } from 'common/theme';

export const MainWrapper = styled('div')(({ theme }) => ({
    display: 'flex',
    gap: 15,
    '&:hover': {
        cursor: 'pointer',
    },
}));

export const HoveredLinkContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    justifyContent: 'center',
}));

export const SubWrappers = styled('div')(({ theme }) => ({
    display: 'flex',
}));

export const HoveredLink = styled('div')(({ theme }) => ({
    backgroundColor: ColorsEnum.darkGrey,
    padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
    borderRadius: 10,
    '&:hover': {
        backgroundColor: ColorsEnum.warmgray1,
        cursor: 'pointer',
    },
}));
