import { styled } from '@mui/system';

export const MainWrapper = styled('div')(({ theme }) => ({
    display: 'flex',
    gap: 15,
    '&:hover': {
        cursor: 'pointer',
    },
}));

export const SubWrappers = styled('div')(({ theme }) => ({
    display: 'flex',
}));
