import { ColorsEnum } from 'common/theme';

import { styled } from '@mui/system';
import { alpha } from '@mui/material';

import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';

export const TableCellWrapper = styled(TableCell)(({ theme }) => ({
	padding: `${theme.spacing(0)} ${theme.spacing(1)}`,
	border: 0
}))

export const TableCellLabel = styled(Typography, {
	shouldForwardProp: prop => prop !== 'isHeader',
})<{
	isHeader?: boolean;
}>(({ theme, isHeader }) => ({
	color: alpha(theme.palette.mode === 'light' ? ColorsEnum.black : (isHeader ? ColorsEnum.white : ColorsEnum.beer), 1),
	fontSize: '10px',
}));