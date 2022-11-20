import { ColorsEnum } from 'common/theme';

import { styled } from '@mui/system';

export const ClockWrapper = styled('div')(({ theme }) => ({
    width: 250,
    padding: 15,
}));

export const TimeIndicator = styled('div')(({ theme }) => ({
    height: 5,
    borderRadius: 5,
}));

export const TimeWrapper = styled('div')(({ theme }) => ({
    minHeight: 120,
    paddingTop: 10,
    paddingBottom: 10,
}));

export const WeatherWrapper = styled('div')(({ theme }) => ({
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: ColorsEnum.coolgray5,
    backgroundColor: ColorsEnum.darkGrey,
}));
