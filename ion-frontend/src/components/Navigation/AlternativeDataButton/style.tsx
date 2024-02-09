import { Button, Menu, MenuItem, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { ColorsEnum } from 'common/theme';

export const StyledMenu = styled(Menu)(({ theme }) => ({
    width: `calc(350px + 2vw)`,
}));

export const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
    gap: 5,
    width: `calc(350px + 2vw)`,
    whiteSpace: 'unset',
    wordBreak: 'break-all',
}));

export const StyledMenuButton = styled(Button)(({ theme }) => ({
    color: theme.palette.mode === 'dark' ? ColorsEnum.white : ColorsEnum.black,
    '&:hover': {
        cursor: 'pointer',
    },
    borderRadius: '20px',
}));

export const ButtonSubtitles = styled(Typography)(({ theme }) => ({
    color: theme.palette.mode === 'dark' ? ColorsEnum.warmgray5 : ColorsEnum.warmgray2,
    width: '100%',
}));
