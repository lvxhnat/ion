import React, { useEffect, useState } from 'react'

import moment from 'moment-timezone'

import { Grid } from '@mui/material';

export default function Clock() {

    const [date, setDate] = useState<string>("");
    const [marketStatus, setMarketStatus] = useState<string | undefined>();

    useEffect(() => {
        const interval = setInterval(() => {
            moment.tz.setDefault("America/New_York")
            var newYorkTime = moment()
            setDate(newYorkTime.format('DD MMM YY, HH:mm:ss ddd'))
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <Grid container alignItems='center' sx={{ fontSize: '12px' }}>
            <span> {marketStatus} </span>
            <span><b> NYT: </b> {date} </span>
        </Grid >
    )
}