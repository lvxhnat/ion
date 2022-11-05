import { styled } from '@mui/system';
import Chip from '@mui/material/Chip';

export const ChipWrapper = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'inline',
    padding: `${theme.spacing(1)} ${theme.spacing(2)}`
}));

export const StyledChip = styled(Chip)(({ theme }) => ({
    fontSize: '12px',
    padding: 0,
}));