import * as React from 'react';
import * as S from './style';

import moment from 'moment-timezone';
import Typography from '@mui/material/Typography';
import { ColorsEnum } from 'common/theme';
import { dataIngestionRequest } from 'services/request';
import { ENDPOINTS } from 'common/constant/endpoints';

import { weatherMapping } from './mappings';

// https://colordesigner.io/gradient-generator
// https://momentjs.com/timezone/
export default function InternationalClock(props: { timeZoneName: string; timeZone: string }) {
    const [date, setDate] = React.useState<string>('');
    const [time, setTime] = React.useState<string>('');
    const [color, setColor] = React.useState<string>('');
    const [weatherData, setWeatherData] = React.useState<any>();
    const [weatherLoading, setWeatherLoading] = React.useState<boolean>(false);

    React.useEffect(() => {
        setWeatherLoading(true);
        dataIngestionRequest.post(ENDPOINTS.PRIVATE.WEATHER_ENDPOINT, {}).then(data => {
            setWeatherData(data.data);
            setWeatherLoading(false);
        });
    }, []);

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
        <S.ClockWrapper>
            <S.TimeIndicator style={{ backgroundColor: color }} />
            <S.TimeWrapper>
                <Typography variant="h1" align="center">
                    {time}
                </Typography>
                <Typography variant="h3" align="left" sx={{ color: ColorsEnum.coolgray4 }}>
                    {date}
                </Typography>
                <Typography variant="h2" align="left" sx={{ color: ColorsEnum.beer }}>
                    {props.timeZoneName}
                </Typography>
            </S.TimeWrapper>
            <S.WeatherWrapper>
                {weatherData && !weatherLoading ? (
                    <>
                        <Typography variant="h3" align="left" sx={{ color: ColorsEnum.coolgray4 }}>
                            {weatherData.current_condition[0].weatherDesc[0].value as string}
                        </Typography>
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
                    </>
                ) : null}
            </S.WeatherWrapper>
        </S.ClockWrapper>
    );
}
