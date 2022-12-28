import * as React from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import Header from 'components/Header';
import { Grid } from '@mui/material';
import { TreasuryTableWidget } from 'functions/treasurytable';

import { ForexTableWidget } from 'functions/forextable';
import { InternationalClockWidget } from 'functions/internationalclock';

export default function Landing() {
    return (
        <>
            <CssBaseline />
            <Header />
            <Grid container columns={25} spacing={1}>
                <Grid item xs={5}></Grid>
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
