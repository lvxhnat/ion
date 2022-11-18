import { styled } from '@mui/system';

export const HeaderPanel = styled('div')(({ theme }) => ({
    marginLeft: 'auto',
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    gap: theme.spacing(1),
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
}));
