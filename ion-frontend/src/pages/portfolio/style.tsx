import { ColorsEnum } from 'common/theme';

import { styled } from '@mui/system';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

export const OptionsWrapper = styled('div')(({ theme }) => ({
    display: 'flex',
    backgroundColor: ColorsEnum.black,
    gap: 5,
}));

export const IconButtonWrapper = styled(IconButton)(({ theme }) => ({
    padding: 0,
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 0,
}));
