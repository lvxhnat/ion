import { ColorsEnum } from 'common/theme';

import { styled } from '@mui/system';

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
    padding: 15,
    paddingLeft: 0,
    paddingRight: 0,
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
    minHeight: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: ColorsEnum.coolgray5,
    backgroundColor: ColorsEnum.warmgray6,
    gap: 25,
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

export const InternationalClockWrapper = styled('div')(({ theme }) => ({
    display: 'flex',
    gap: 15,
    minHeight: 200,
}));

export const IconWrapper = styled('div')(({ theme }) => ({
    height: 30,
    fontSize: 30,
}));

export const IconObjectWrapper = styled('div')(({ theme }) => ({
    textAlign: 'center',
    padding: 5,
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
