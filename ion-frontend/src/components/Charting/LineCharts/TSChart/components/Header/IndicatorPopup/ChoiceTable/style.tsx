import { styled } from '@mui/system';
import Chip from '@mui/material/Chip';

export const ChipWrapper = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'inline',
    padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
    gap: 10,
}));

export const StyledChip = styled(Chip)(({ theme }) => ({
    fontSize: '0.8rem',
    padding: 0,
}));
