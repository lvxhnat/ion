import * as React from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import { Grid } from '@mui/material';
import { TreasuryTableWidget } from 'functions/treasurytable';

import { ForexTableWidget } from 'functions/forextable';
import { InternationalClockWidget } from 'functions/internationalclock';
import { HealthCheckWidget } from 'functions/healthchecks';
import Navigation from 'components/Navigation';

export default function Landing() {
    return (
        <>
            <CssBaseline />
            <Navigation />
            <Grid container columns={25} spacing={1}>
                <Grid item xs={5}>
                    <HealthCheckWidget />
                </Grid>
                <Grid item xs={14}>
                    <InternationalClockWidget />
                </Grid>
                <Grid item xs={6}>
                    <ForexTableWidget />
                    <TreasuryTableWidget />
                </Grid>
            </Grid>
        </>
    );
}
