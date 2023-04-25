import { ColorsEnum } from 'common/theme';

import { styled } from '@mui/system';

export const OptionsWrapper = styled('div')(({ theme }) => ({
    display: 'flex',
    backgroundColor: ColorsEnum.darkGrey,
    border: `1px solid ${ColorsEnum.warmgray1}`,
    gap: 5,
}));

export const ButtonWrapper = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: `${theme.spacing(0.5)} ${theme.spacing(1)}`,
    '&:hover': {
        backgroundColor: ColorsEnum.darkGrey,
        cursor: 'pointer',
    },
}));

export const LabOpenButtonWrapper = styled('div')(({ theme }) => ({
    height: 15,
    width: 15,
    fontSize: 15,
    backgroundColor: ColorsEnum.warmgray4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    color: ColorsEnum.darkGrey,
}));

export const LabPopupContainerWrapper = styled('div')(({ theme }) => ({
    height: 25,
    width: '100%',
    display: 'flex',
    padding: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: ColorsEnum.coolgray6,
    color: ColorsEnum.black,
}));
