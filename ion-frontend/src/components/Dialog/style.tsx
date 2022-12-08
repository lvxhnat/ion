import { styled } from '@mui/material/styles';
import { ColorsEnum } from 'common/theme';

import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

export const StyledButton = styled(Button)(({ theme }) => ({
    color: theme.palette.mode === 'dark' ? ColorsEnum.white : ColorsEnum.coolgray1,
    padding: `calc(${theme.spacing(0.5)} + 0.1vw) calc(${theme.spacing(1)} + 0.1vw)`,
}));

export const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? ColorsEnum.darkGrey : ColorsEnum.warmgray5,
    padding: `calc(${theme.spacing(0.5)} + 0.1vw)`,
}));
