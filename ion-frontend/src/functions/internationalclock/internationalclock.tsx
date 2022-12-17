import * as React from 'react';
import * as S from './style';

import Typography from '@mui/material/Typography';
import { WiStrongWind, WiRaindrop, WiThermometer } from 'react-icons/wi';
import { MdWavingHand } from 'react-icons/md';

import { ColorsEnum } from 'common/theme';
import { dataIngestionRequest } from 'services/request';
import { ENDPOINTS } from 'common/constant/endpoints';
import { geoMapping, weatherMapping } from './mappings';

import TimePiece from './timepiece';

// https://colordesigner.io/gradient-generator
// https://momentjs.com/timezone/
export default function InternationalClock(props: { timeZoneName: string }) {
    const [weatherData, setWeatherData] = React.useState<any>();
    const [weatherLoading, setWeatherLoading] = React.useState<boolean>(false);

    React.useEffect(() => {
        setWeatherLoading(true);
        dataIngestionRequest
            .post(ENDPOINTS.PRIVATE.WEATHER_ENDPOINT, {
                iata: geoMapping[props.timeZoneName].IATA,
            })
            .then(data => {
                setWeatherData(data.data);
                setWeatherLoading(false);
            });
    }, []);

    return (
        <S.ClockWrapper>
            <TimePiece
                timeZoneName={props.timeZoneName}
                timeZone={geoMapping[props.timeZoneName].timeZone}
            />
            <S.WeatherTextWrapper>
                <Typography variant="h3" align="left" sx={{ color: ColorsEnum.coolgray4 }}>
                    {weatherData
                        ? (weatherData.current_condition[0].weatherDesc[0].value as string)
                        : null}
                </Typography>
            </S.WeatherTextWrapper>
            <S.WeatherWrapper>
                {weatherData && !weatherLoading ? (
                    <>
                        <S.LeftWeatherWrapper>
                            <Typography variant="h2" align="center">
                                {`${weatherData.current_condition[0].temp_C}°C`}
                            </Typography>
                        </S.LeftWeatherWrapper>
                        <S.RightWeatherWrapper>
                            {
                                weatherMapping[
                                    weatherData.current_condition[0].weatherDesc[0].value as string
                                ]
                            }
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
                                {weatherData.current_condition[0].FeelsLikeC}°C
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
                    <Typography sx={{ fontSize: 10 }} variant="body2" align="center" component="p">
                        {weatherData ? weatherData.current_condition[0].windspeedKmph : null} KMPH
                    </Typography>
                </S.IconObjectWrapper>
                <S.IconObjectWrapper>
                    <S.IconWrapper>
                        {' '}
                        <WiRaindrop />{' '}
                    </S.IconWrapper>
                    <Typography sx={{ fontSize: 10 }} variant="body2" align="center" component="p">
                        {weatherData ? weatherData.current_condition[0].humidity : null} %
                    </Typography>
                </S.IconObjectWrapper>
                <S.IconObjectWrapper>
                    <Typography
                        variant="body2"
                        align="center"
                        component="p"
                        sx={{ fontSize: 10, marginLeft: 4, marginTop: -0.5, position: 'absolute' }}
                    >
                        {weatherData ? weatherData.weather[0].maxtempC : null} °C
                    </Typography>
                    <S.IconWrapper>
                        {' '}
                        <WiThermometer />{' '}
                    </S.IconWrapper>
                    <Typography
                        variant="body2"
                        align="center"
                        component="p"
                        sx={{ fontSize: 10, marginLeft: 4, marginTop: -1.5, position: 'absolute' }}
                    >
                        {weatherData ? weatherData.weather[0].mintempC : null} °C
                    </Typography>
                </S.IconObjectWrapper>
            </S.WeatherTextWrapper>
        </S.ClockWrapper>
    );
}
