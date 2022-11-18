import { styled } from '@mui/system';
import Button from '@mui/material/Button';
import { ColorsEnum } from 'common/theme';

export const HeaderWrapper = styled('div')(({ theme }) => ({
    gap: 5,
    display: 'flex',
    alignItems: 'center',
}));

export const ButtonWrapper = styled(Button)(({ theme }) => ({
    padding: `${theme.spacing(0.5)} ${theme.spacing(2)}`,
    backgroundColor: ColorsEnum.darkGrey,
}));
