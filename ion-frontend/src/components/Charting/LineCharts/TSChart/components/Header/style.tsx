import { styled } from '@mui/system'

export const HeaderWrapper = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
}));

export const StartWrapper = styled('div')(({ theme }) => ({
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
}));

export const EndWrapper = styled('div')(({ theme }) => ({
    width: '100%',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
}));