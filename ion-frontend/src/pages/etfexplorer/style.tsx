import { IconButton } from '@mui/material';
import { styled } from '@mui/system';
import { ColorsEnum } from 'common/theme';

export const TickerWrapper = styled('div')(({ theme }) => ({
    backgroundColor: ColorsEnum.beer,
    height: 20,
    display: 'inline',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: `${theme.spacing(0)} ${theme.spacing(1)}`,
    borderRadius: theme.spacing(0.5),
}));

export const TitleWrapper = styled('div')(({ theme }) => ({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

export const IconButtonWrapper = styled(IconButton)(({ theme }) => ({
    padding: 0,
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 0,
}));
