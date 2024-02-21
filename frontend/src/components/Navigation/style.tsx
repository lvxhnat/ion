import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/system';
import { Button, Menu, MenuItem, Typography } from '@mui/material';
import { ColorsEnum } from 'common/theme';

export const StyledMenu = styled(Menu)(({ theme }) => ({
    width: `calc(350px + 2vw)`,
}));

export const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
    gap: 5,
    fontWeight: 'bold',
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

export const HeaderPanel = styled('div')(({ theme }) => ({
    marginLeft: 'auto',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    gap: theme.spacing(1),
}));

export const NavigationPanel = styled('div')(({ theme }) => ({
    display: 'flex',
    width: '100%',
    padding: `${theme.spacing(1)} 0`,
}));

export const IconButtonWrapper = styled(IconButton)(({ theme }) => ({
    padding: 0,
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 0,
}));

export const RightPanel = styled('div')(({ theme }) => ({
    width: '25%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 10,
    paddingRight: 10,
}));

export const LeftPanel = styled('div')(({ theme }) => ({
    display: 'flex',
    width: '50%',
    gap: 5,
}));

export const CentrePanel = styled('div')(({ theme }) => ({
    gap: 50,
    display: 'flex',
    width: '25%',
}));
