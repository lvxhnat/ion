import { styled } from '@mui/system';
import Button from '@mui/material/Button';
import { ColorsEnum } from 'common/theme';

export const SubHeaderWrapper = styled('div')(({ theme }) => ({
    gap: 5,
    display: 'flex',
    alignItems: 'center',
    padding: `${theme.spacing(0.5)} 0`,
}));

export const StyledButton = styled(Button)(({ theme }) => ({
    backgroundColor: ColorsEnum.darkGrey,
    padding: 0,
    ':&focus': {
        backgroundColor: ColorsEnum.geekBlue,
    },
}));
