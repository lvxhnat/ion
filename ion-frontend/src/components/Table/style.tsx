import { styled } from '@mui/system';
import { alpha } from '@mui/material';
import Typography from '@mui/material/Typography';

import { ColorsEnum } from 'common/theme';

export const TableCellLabel = styled(Typography)(({ theme }) => ({
    color: alpha(theme.palette.mode === 'light' ? ColorsEnum.black : ColorsEnum.beer, 0.5),
}));
