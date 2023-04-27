import { ColorsEnum } from 'common/theme';

import { styled } from '@mui/system';
import { typographyTheme } from 'common/theme/typography';

export const IntegerChoiceInput = styled('input')(({ theme }) => ({
    width: '100%',
    padding: 3,
    fontSize: typographyTheme.subtitle2.fontSize,
    borderRadius: 1,
    backgroundColor: ColorsEnum.darkGrey,
    color: theme.palette.mode === 'dark' ? ColorsEnum.white : ColorsEnum.black,
    border: `1px solid ${theme.palette.mode === 'dark' ? ColorsEnum.warmgray1 : ColorsEnum.black}`,
    textAlign: 'right',
    '&:focus': {
        outline: 'none',
    },
}));

export const ChoiceContainer = styled('div')(({ theme }) => ({
    gap: 5,
    padding: `${theme.spacing(0.2)} ${theme.spacing(1)}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));
