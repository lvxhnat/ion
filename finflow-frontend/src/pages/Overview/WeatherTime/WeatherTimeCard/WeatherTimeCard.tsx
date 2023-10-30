import React from 'react';
import TimePiece from './TimePiece';

import { Grid } from '@mui/material';
import { WeatherTimeCardProps } from './type';

export default function WeatherTimeCard(props: WeatherTimeCardProps) {
    return (
        <Grid container>
            <TimePiece timeZoneName={props.timeZoneName} timeZone={props.timeZone} />
        </Grid>
    );
}
