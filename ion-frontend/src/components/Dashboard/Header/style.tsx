import { styled } from '@mui/system';

export const HeaderPanel = styled('div')(({ theme }) => ({
	marginLeft: 'auto',
	display: 'flex',
	alignItems: 'center',
	height: '100%',
	gap: theme.spacing(1),
}));