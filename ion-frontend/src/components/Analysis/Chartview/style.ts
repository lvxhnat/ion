import { ColorsEnum } from 'common/theme';

import { styled } from '@mui/system';
import { Box } from '@mui/material';

interface FlexRowProps {
    alternate?: boolean;
}

const baseFlexStyling = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};

export const Item = styled(Box)(({ theme }) => ({
    height: '100%',
    color: theme.palette.text.secondary,
}));

export const ChangeRows = styled('div')(({ theme }) => ({
    ...baseFlexStyling,
    fontSize: 8,
    height: '100%',
}));

export const FlexRow = styled('div')<FlexRowProps>(({ theme, alternate }) => ({
    gap: 5,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: alternate ? ColorsEnum.darkGrey : ColorsEnum.warmgray1,
    padding: `${theme.spacing(0.5)} ${theme.spacing(2)}`,
    '&:hover': {
        backgroundColor: ColorsEnum.beer,
        cursor: 'pointer',
    },
}));

export const TickerSearchWrapper = styled('div')(({ theme }) => ({
    ...baseFlexStyling,
    width: '100%',
    backgroundColor: theme.palette.mode === 'dark' ? ColorsEnum.warmgray1 : ColorsEnum.coolgray4,
    padding: '2px',
}));

interface PopupContainerProps {
    show?: boolean;
}

export const PopupContainer = styled('div')<PopupContainerProps>(({ theme, show }) => ({
    display: show ? 'flex' : 'none',
    flexDirection: 'column',
    position: 'absolute',
    margin: '0 auto',
    top: '25%',
    width: 'calc(700px + 5vw)',
    height: 'calc(350px + 5vh)',
    maxWidth: 1000,
    maxHeight: 450,
    borderRadius: 10,
    backgroundColor: ColorsEnum.black,
}));

export const LabPopupHeaderWrapper = styled('div')(({ theme }) => ({
    ...baseFlexStyling,
    height: 25,
    width: '100%',
    padding: 2,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: ColorsEnum.coolgray6,
    color: ColorsEnum.black,
}));

export const ButtonWrapper = styled('div')(({ theme }) => ({
    gap: 3,
    height: 25,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: ColorsEnum.warmgray2,
    padding: `${theme.spacing(0.5)} ${theme.spacing(1)}`,
    '&:hover': {
        backgroundColor: ColorsEnum.darkGrey,
        cursor: 'pointer',
    },
}));

export const LabOpenButtonWrapper = styled('div')(({ theme }) => ({
    ...baseFlexStyling,
    height: 15,
    width: 15,
    fontSize: 15,
    backgroundColor: ColorsEnum.warmgray4,
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
    ...baseFlexStyling,
    width: '100%',
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
        ...baseFlexStyling,
        padding: theme.spacing(0.8),
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
    ...baseFlexStyling,
    padding: 0,
    fontSize: 15,
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

export const MutliCharviewPanel = styled('div')(({ theme }) => ({
    ...baseFlexStyling,
    height: '100%',
}));

export const MutliCharviewLeftSidebar = styled('div')(({ theme }) => ({
    ...baseFlexStyling,
    width: '68%',
    height: '100%',
}));

export const MutliCharviewRightSidebar = styled('div')(({ theme }) => ({
    ...baseFlexStyling,
    width: '32%',
    justifyContent: 'flex-start',
}));

export const ColoredBox = styled('div')(({ theme }) => ({
    width: 15,
    height: 15,
}));

export const LineInfoRow = styled('div')(({ theme }) => ({
    display: 'flex',
    gap: 10,
    padding: `0 ${theme.spacing(0.5)}`,
    justifyContent: 'flex-start',
    alignItems: 'center',
}));

export const LineInfoTable = styled('div')(({ theme }) => ({
    ...baseFlexStyling,
    gap: 2,
    padding: 10,
    flexDirection: 'column',
}));
