import { ColorsEnum } from 'common/theme';

import { styled } from '@mui/system';

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

type LabPopupStrategyRowProps = {
    header?: boolean;
    theme?: any;
};

export const LabPopupStrategyRow = styled('div')<LabPopupStrategyRowProps>(({ theme, header }) => ({
    padding: theme.spacing(1),
    display: 'flex',
    backgroundColor: header ? ColorsEnum.darkGrey : 'transparent',
}));

export const LabPopupMetricsTableWrapper = styled('div')(({ theme }) => ({
    width: '30%',
    paddingTop: 10,
    display: 'flex',
    flexDirection: 'column',
    height: '300px',
    overflowY: 'scroll',
    border: '1px solid ' + ColorsEnum.warmgray1,
    '&::-webkit-scrollbar': { width: 0 },
}));
