import { ColorsEnum } from 'common/theme';

import { styled } from '@mui/system';

export const StyledTableInnerCell = styled('div')(({ theme }) => ({
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
}));

const portfolioSidePanelToolStyles = {
    backgroundColor: ColorsEnum.warmgray1,
    gap: 5,
    padding: 5,
    display: 'flex',
    alignItems: 'center',
};

export const PortfolioSidePanelBody = styled('div')(({ theme }) => ({
    flex: 1,
    minHeight: 400,
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

interface LabPopupProp {
    show?: boolean;
}

export const LabPopup = styled('div')<LabPopupProp>(({ theme, show = false }) => ({
    display: show ? 'block' : 'none',
    position: 'absolute',
    margin: '0 auto',
    top: '25%',
    left: '25%',
    width: 'calc(650px + 5vw)',
    height: 'calc(350px + 5vh)',
    maxWidth: 700,
    maxHeight: 450,
    borderRadius: 10,
    backgroundColor: ColorsEnum.black,
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

export const LabPopupFooter = styled('div')(({ theme }) => ({
    gap: 5,
    padding: 5,
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    backgroundColor: ColorsEnum.darkGrey,
}));

export const LabPopupHeader = styled('div')(({ theme }) => ({
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
