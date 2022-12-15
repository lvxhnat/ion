import { styled } from '@mui/system';

export const HeaderPanel = styled('div')(({ theme }) => ({
    display: 'flex',
    width: '100%',
    position: 'relative',
    gap: theme.spacing(1),
    padding: theme.spacing(1),
}));

export const LeftPanel = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'flex-start',
}));

export const RightPanel = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'middle',
}));
