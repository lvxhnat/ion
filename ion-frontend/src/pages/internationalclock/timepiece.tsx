import * as React from 'react';
import * as S from './style';

import moment from 'moment-timezone';
import Typography from '@mui/material/Typography';
import { ColorsEnum } from 'common/theme';

// https://colordesigner.io/gradient-generator
// https://momentjs.com/timezone/
export default function TimePiece(props: { timeZoneName: string; timeZone: string }) {
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
        </>
    );
}
