import { styled } from '@mui/system';

export const DividerWrapper = styled('div')(({ theme }) => ({
    paddingTop: theme.spacing(1.5),
}));

export const HeaderPanel = styled('div')(({ theme }) => ({
    display: 'flex',
    width: '100%',
    height: 40,
    padding: theme.spacing(0.5),
}));

export const LeftPanel = styled('div')(({ theme }) => ({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
}));

export const RightPanel = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'middle',
}));
