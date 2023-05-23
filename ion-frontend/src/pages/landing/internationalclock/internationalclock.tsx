import * as React from 'react';
import * as S from './style';
import moment from 'moment';

import Typography from '@mui/material/Typography';
import InfoIcon from '@mui/icons-material/Info';
import { WiStrongWind, WiRaindrop, WiThermometer } from 'react-icons/wi';
import { MdWavingHand } from 'react-icons/md';

import { ColorsEnum } from 'common/theme';
import { geoMapping } from './mappings';

import { getCurrentWeather } from 'endpoints/clients/weather';
import { CurrentWeatherSchema } from 'endpoints/schema/weather';
import { capitalizeString } from 'common/helper/general';
import { Tooltip } from '@mui/material';
import { formatDate } from 'common/constant/dates';

// https://colordesigner.io/gradient-generator
// https://momentjs.com/timezone/
function TimePiece(props: { timeZoneName: string; timeZone: string }) {
    const [date, setDate] = React.useState<string>('');
    const [time, setTime] = React.useState<string>('');
    const [color, setColor] = React.useState<string>('');

    React.useEffect(() => {
        const interval = setInterval(() => {
            moment.tz.setDefault(props.timeZone);
            const timeZone = moment();
            setDate(timeZone.format('ddd DD/MM \\G\\M\\T \xa0 Z'));
            setTime(timeZone.format('HH:mm:ss'));
            setColor(ColorsEnum[`beer${timeZone.hours()}` as keyof typeof ColorsEnum]);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <S.TimeIndicator style={{ backgroundColor: color }} />
            <S.TimeWrapper>
                <Typography variant="h1" align="center" sx={{ padding: 1 }}>
                    {time}
                </Typography>
                <Typography variant="h3" align="left" sx={{ color: ColorsEnum.coolgray4 }}>
                    {date}
                </Typography>
                <Typography variant="h2" align="left" sx={{ color: ColorsEnum.beer }}>
                    {props.timeZoneName}
                </Typography>
            </S.TimeWrapper>
        </>
    );
}

// https://colordesigner.io/gradient-generator
// https://momentjs.com/timezone/
export default function InternationalClock(props: { timeZoneName: string }) {
    const [lastUpdated, setLastUpdated] = React.useState<Date>(new Date());
    const [weatherData, setWeatherData] = React.useState<CurrentWeatherSchema>();
    const [weatherLoading, setWeatherLoading] = React.useState<boolean>(false);

    const updateWeatherData = () => {
        getCurrentWeather(props.timeZoneName, geoMapping[props.timeZoneName].country_code).then(
            data => {
                if (Object.keys(data.data).length !== 0) setWeatherData(data.data);
                setWeatherLoading(false);
            }
        );
    };

    React.useEffect(() => {
        setWeatherLoading(true);
        updateWeatherData();
        const interval = setInterval(() => {
            updateWeatherData();
            setLastUpdated(new Date());
        }, 1000 * 60 * 60);
        return () => clearInterval(interval);
    }, []);

    return (
        <S.ClockWrapper>
            <TimePiece
                timeZoneName={weatherData ? weatherData.city : props.timeZoneName}
                timeZone={geoMapping[props.timeZoneName].timeZone}
            />
            <S.WeatherTextWrapper style={{ gap: 0 }}>
                <Tooltip title={`Last updated at ${formatDate(lastUpdated)}`}>
                    <InfoIcon fontSize="inherit"/>
                </Tooltip>
                <Typography
                    noWrap
                    variant="h4"
                    align="left"
                    sx={{ 
                        color: ColorsEnum.coolgray4, 
                        gap: 1, 
                        padding: 1
                }}
                >
                    {weatherData ? capitalizeString(weatherData.weather_condition) : null}
                </Typography>
            </S.WeatherTextWrapper>
            <S.WeatherWrapper>
                {weatherData && !weatherLoading ? (
                    <>
                        <S.LeftWeatherWrapper>
                            <Typography variant="h3" align="center">
                                {`${Math.round(weatherData.temp)}°C`}
                            </Typography>
                        </S.LeftWeatherWrapper>
                        <S.RightWeatherWrapper>
                            <img
                                style={{ width: 40, height: 40 }}
                                src={weatherData.weather_icon_url}
                                alt=""
                            />
                        </S.RightWeatherWrapper>
                        <S.IconObjectTextWrapper>
                            <S.IconWaveObjectWrapper>
                                <MdWavingHand />
                            </S.IconWaveObjectWrapper>
                            <Typography
                                variant="body2"
                                align="center"
                                component="p"
                                sx={{
                                    fontSize: 10,
                                }}
                            >
                                {`${Math.round(weatherData.feels_like)}°C`}
                            </Typography>
                        </S.IconObjectTextWrapper>
                    </>
                ) : null}
            </S.WeatherWrapper>
            <S.WeatherTextWrapper>
                <S.IconObjectWrapper>
                    <S.IconWrapper>
                        {' '}
                        <WiStrongWind />{' '}
                    </S.IconWrapper>
                    <Typography variant="overline" align="center" component="p">
                        {weatherData ? Math.round(weatherData.wind_speed) : null} KMPH
                    </Typography>
                </S.IconObjectWrapper>
                <S.IconObjectWrapper>
                    <S.IconWrapper>
                        {' '}
                        <WiRaindrop />{' '}
                    </S.IconWrapper>
                    <Typography variant="overline" align="center" component="p">
                        {weatherData ? weatherData.humidity : null} %
                    </Typography>
                </S.IconObjectWrapper>
                <S.IconObjectWrapper>
                    <Typography
                        variant="overline"
                        align="center"
                        component="p"
                        sx={{ marginTop: -2, marginLeft: 2, position: 'absolute' }}
                    >
                        {weatherData ? Math.round(weatherData.temp_max) : null} °C
                    </Typography>
                    <S.IconWrapper style={{ marginBottom: 2 }}>
                        {' '}
                        <WiThermometer />{' '}
                    </S.IconWrapper>
                    <Typography
                        variant="overline"
                        align="center"
                        component="p"
                        sx={{ marginTop: -1, marginLeft: 2, position: 'absolute' }}
                    >
                        {weatherData ? Math.round(weatherData.temp_min) : null} °C
                    </Typography>
                </S.IconObjectWrapper>
            </S.WeatherTextWrapper>
        </S.ClockWrapper>
    );
}
