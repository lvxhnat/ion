import { styled } from '@mui/system';

export const SearchWrapper = styled('div')(({ theme }) => ({
	position: 'relative',
	'.MuiInputBase-root': {
		fieldset: {
			border: 'none',
			background:
                theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.06)' : 'rgba(255, 255, 255, 0.09)',
		},
		'&.Mui-focused fieldset': {
			background:
                theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.09)' : 'rgba(255, 255, 255, 0.06)',
		},
		'&:hover fieldset': {
			background:
                theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.09)' : 'rgba(255, 255, 255, 0.06)',
		},
		'&.Mui-disabled fieldset': {
			background:
                theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.06)' : 'rgba(255, 255, 255, 0.09)',
		},
	},
}));
