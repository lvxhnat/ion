import { ColorsEnum } from 'common/theme';

import { styled } from '@mui/system';

const portfolioSidePanelToolStyles = {
    backgroundColor: ColorsEnum.warmgray1,
    gap: 5,
    padding: 5,
    display: 'flex',
    alignItems: 'center',
};

export const PortfolioSidePanelBody = styled('div')(({ theme }) => ({
    flex: 1,
}));

export const PortfolioSidePanelFooter = styled('div')(({ theme }) => ({
    ...portfolioSidePanelToolStyles,
}));

export const OptionsWrapper = styled('div')(({ theme }) => ({
    display: 'flex',
    backgroundColor: ColorsEnum.warmgray1,
    padding: 3,
    gap: 5,
}));

interface ButtonWrapperProp {
    disabled?: boolean;
}

export const ButtonWrapper = styled('div')<ButtonWrapperProp>(({ theme, disabled = false }) => ({
    gap: 3,
    display: 'flex',
    alignItems: 'center',
    fontColor: ColorsEnum.white,
    backgroundColor: ColorsEnum.warmgray2,
    opacity: !disabled ? 1 : 0.4,
    padding: `${theme.spacing(0.5)} ${theme.spacing(1)}`,
    '&:hover': !disabled
        ? {
              backgroundColor: ColorsEnum.warmgray2,
              cursor: 'pointer',
          }
        : undefined,
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
