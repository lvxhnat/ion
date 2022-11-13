import * as React from 'react';

import moment from 'moment-timezone';

import { Grid, Typography } from '@mui/material';

export default function Clock() {
    const [date, setDate] = React.useState<string>('');
    const [marketStatus, setMarketStatus] = React.useState<string | undefined>();

    React.useEffect(() => {
        const interval = setInterval(() => {
            moment.tz.setDefault('America/New_York');
            const newYorkTime = moment();
            setDate(newYorkTime.format('DD MMM YY, HH:mm:ss ddd'));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <Grid container alignItems="center">
            <Typography component="span" variant="body1">
                {' '}
                {marketStatus}{' '}
            </Typography>
            <span>
                <b> NYT: </b> {date}{' '}
            </span>
        </Grid>
    );
}
