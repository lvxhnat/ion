import { ColorsEnum } from 'common/theme';

import { styled } from '@mui/system';
import Grid from '@mui/material/Grid';

export const Panel = styled('div')(({ theme }) => ({}));

export const LeftPanel = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'flex-start',
}));

export const RightPanel = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'flex-end',
}));

export const ClockWrapper = styled('div')(({ theme }) => ({
    width: '100%',
}));

export const TimeIndicator = styled('div')(({ theme }) => ({
    height: 5,
    borderRadius: 5,
}));

export const TimeWrapper = styled('div')(({ theme }) => ({
    minHeight: 120,
    padding: 10,
}));

export const WeatherWrapper = styled('div')(({ theme }) => ({
    minHeight: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: ColorsEnum.coolgray5,
    backgroundColor: ColorsEnum.darkGrey,
}));

export const WeatherTextWrapper = styled('div')(({ theme }) => ({
    minHeight: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: ColorsEnum.coolgray5,
    backgroundColor: ColorsEnum.warmgray6,
    gap: 25,
    fontSize: 12,
}));

export const LeftWeatherWrapper = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: ColorsEnum.coolgray5,
    backgroundColor: ColorsEnum.darkGrey,
}));

export const RightWeatherWrapper = styled('div')(({ theme }) => ({
    paddingLeft: 5,
    paddingRight: 5,
    display: 'flex',
    flexDirection: 'row',
    fontSize: '35px',
    justifyContent: 'flex-end',
    alignItems: 'center',
    verticalAlign: 'middle',
}));

export const ICWidgetWrapper = styled(Grid)(({ theme }) => ({
    minHeight: 200,
}));

export const ICObjectWrapper3 = styled(Grid)(({ theme }) => ({
    [theme.breakpoints.down('lg')]: {
        display: 'none',
    },
}));

export const ICObjectWrapper2 = styled(Grid)(({ theme }) => ({
    [theme.breakpoints.down('lg')]: {
        display: 'none',
    },
}));

export const IconWrapper = styled('div')(({ theme }) => ({
    height: 15,
    fontSize: 20,
}));

export const IconObjectWrapper = styled('div')(({ theme }) => ({
    height: '100%',
    textAlign: 'center',
    padding: 0,
}));

export const TempWrapper = styled('div')(({ theme }) => ({
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
}));

export const IconWaveObjectWrapper = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
}));

export const IconObjectTextWrapper = styled('div')(({ theme }) => ({
    textAlign: 'center',
    padding: 5,
    width: 40,
    height: 40,
    border: `1px solid ${ColorsEnum.coolgray4}`,
    borderRadius: '5px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    verticalAlign: 'middle',
}));
