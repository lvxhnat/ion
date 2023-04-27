import { ColorsEnum } from 'common/theme';

import { styled } from '@mui/system';

interface PopupContainerProps {
    show?: boolean;
}

export const PopupContainer = styled('div')<PopupContainerProps>(({ theme, show }) => ({
    display: show ? 'flex' : 'none',
    flexDirection: 'column',
    position: 'absolute',
    margin: '0 auto',
    top: '25%',
    width: 'calc(650px + 5vw)',
    height: 'calc(350px + 5vh)',
    maxWidth: 700,
    maxHeight: 450,
    borderRadius: 10,
    backgroundColor: ColorsEnum.black,
}));

export const LabPopupHeaderWrapper = styled('div')(({ theme }) => ({
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

export const LabContainerMetricTableRow = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'start',
    gap: 3,
    fontSize: 12,
    padding: `${theme.spacing(0.2)} ${theme.spacing(1)}`,
    '&:hover': {
        backgroundColor: ColorsEnum.geekBlue,
        cursor: 'pointer',
    },
}));

type LabPopupStrategyRowCellProps = {
    header?: boolean;
    theme?: any;
};

export const LabPopupStrategyRow = styled('div')(({ theme }) => ({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: `1px solid ${ColorsEnum.warmgray1}`,
    borderTop: 0,
    borderRight: 0,
    '&:hover': {
        backgroundColor: ColorsEnum.geekBlue,
        cursor: 'pointer',
    },
}));

export const LabPopupStrategyRowCell = styled('div')<LabPopupStrategyRowCellProps>(
    ({ theme, header }) => ({
        padding: theme.spacing(0.8),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: header ? ColorsEnum.darkGrey : 'transparent',
    })
);

export const LabPopupMetricsTableWrapper = styled('div')(({ theme }) => ({
    width: '30%',
    paddingTop: 10,
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'scroll',
    borderRight: '1px solid ' + ColorsEnum.warmgray1,
    '&::-webkit-scrollbar': { width: 0 },
}));

export const CloseIconWrapper = styled('div')(({ theme }) => ({
    padding: 0,
    fontSize: 15,
    display: 'flex',
    alignItems: 'center',
    '&:hover': {
        cursor: 'pointer',
    },
}));

export const PopupSubHeader = styled('div')(({ theme }) => ({
    backgroundColor: ColorsEnum.warmgray1,
    padding: 2,
    paddingLeft: 5,
}));

export const BottomToolbar = styled('div')(({ theme }) => ({
    gap: 5,
    bottom: 0,
    padding: 5,
    width: '100%',
    display: 'flex',
    position: 'absolute',
    justifyContent: 'flex-end',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    backgroundColor: ColorsEnum.darkGrey,
}));
