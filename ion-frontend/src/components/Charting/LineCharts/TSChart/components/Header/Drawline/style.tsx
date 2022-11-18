import { ColorsEnum } from 'common/theme';

import { styled } from '@mui/system';
import IconButton from '@mui/material/IconButton';

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
    backgroundColor: ColorsEnum.darkGrey,
    padding: `calc(${theme.spacing(0.5)} + 0.1vw)`,
}));
