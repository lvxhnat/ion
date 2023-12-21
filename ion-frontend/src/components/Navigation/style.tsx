import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/system';

export const HeaderPanel = styled('div')(({ theme }) => ({
    marginLeft: 'auto',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    gap: theme.spacing(1),
}));

export const NavigationPanel = styled('div')(({ theme }) => ({
    display: 'flex',
    padding: `${theme.spacing(0.5)} 0`,
}));

export const IconButtonWrapper = styled(IconButton)(({ theme }) => ({
    padding: 0,
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 0,
}));

export const RightPanel = styled('div')(({ theme }) => ({
    width: '50%',
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'flex-end',
    alignItems: 'middle',
}));

export const LeftPanel = styled('div')(({ theme }) => ({
    display: 'flex',
    width: '50%',
    gap: 5,
}));
