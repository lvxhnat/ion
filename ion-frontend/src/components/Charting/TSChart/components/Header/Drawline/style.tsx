import Button from '@mui/material/Button';
import { styled } from '@mui/system';

export const ButtonWrapper = styled(Button)(({ theme }) => ({
	padding: `${theme.spacing(0.5)} ${theme.spacing(2)}`,
	fontSize: '12px'
}));