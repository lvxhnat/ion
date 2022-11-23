import { ColorsEnum } from 'common/theme';

import { styled } from '@mui/system';
import Button from '@mui/material/Button';

export const OptionsWrapper = styled('div')(({ theme }) => ({
    display: 'flex',
    backgroundColor: ColorsEnum.royalred,
    gap: 5,
}));

export const StyledButton = styled(Button)(({ theme }) => ({
    color: ColorsEnum.white,
    padding: `${theme.spacing(0.5)} ${theme.spacing(2)}`,
}));
