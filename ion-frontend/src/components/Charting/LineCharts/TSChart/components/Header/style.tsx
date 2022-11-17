import { styled } from '@mui/system';
import Button from '@mui/material/Button';
import { ColorsEnum } from 'common/theme';

export const HeaderWrapper = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
}));

export const StartWrapper = styled('div')(({ theme }) => ({
    gap: 5,
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
}));

export const EndWrapper = styled('div')(({ theme }) => ({
    width: '100%',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
}));

export const ButtonWrapper = styled(Button)(({ theme }) => ({
    padding: `${theme.spacing(0.5)} ${theme.spacing(2)}`,
    backgroundColor: ColorsEnum.darkGrey,
}));
