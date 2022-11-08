import Button from '@mui/material/Button';
import { styled } from '@mui/system';

export const ButtonWrapper = styled(Button)(({ theme }) => ({
	padding: `${theme.spacing(0.5)} ${theme.spacing(2)}`,
	fontSize: '12px'
}));

export const SearchWrapper = styled('div')(({ theme }) => ({
	minWidth: '100px',
	[theme.breakpoints.down('sm')]: {
		minWidth: '100%',
		marginBottom: theme.spacing(2),
	},
}));
