import * as React from 'react';

import Grid from '@mui/material/Grid';
import CssBaseline from '@mui/material/CssBaseline';

import Navigation from 'components/Navigation';

import { TreasuryTableWidget } from 'functions/treasurytable';
import { ForexTableWidget } from 'functions/forextable';
import { InternationalClockWidget } from 'functions/internationalclock';
import { HealthCheckWidget } from 'functions/healthchecks';
import { WatchlistWidget } from 'functions/watchlist';
import { LivePlayerWidget } from 'functions/liveplayer/widget';

export default function Landing() {
    console.log(
        '██╗ ██████╗ ███╗   ██╗    ███████╗███╗   ██╗ ██████╗ ██╗███╗   ██╗███████╗\n██║██╔═══██╗████╗  ██║    ██╔════╝████╗  ██║██╔════╝ ██║████╗  ██║██╔════╝\n██║██║   ██║██╔██╗ ██║    █████╗  ██╔██╗ ██║██║  ███╗██║██╔██╗ ██║█████╗  \n██║██║   ██║██║╚██╗██║    ██╔══╝  ██║╚██╗██║██║   ██║██║██║╚██╗██║██╔══╝  \n██║╚██████╔╝██║ ╚████║    ███████╗██║ ╚████║╚██████╔╝██║██║ ╚████║███████╗\n╚═╝ ╚═════╝ ╚═╝  ╚═══╝    ╚══════╝╚═╝  ╚═══╝ ╚═════╝ ╚═╝╚═╝  ╚═══╝╚══════╝'
    );
    return (
        <>
            <CssBaseline />
            <Navigation />
            <Grid container columns={25} spacing={1}>
                <Grid item xs={5}>
                    <HealthCheckWidget />
                    <WatchlistWidget />
                </Grid>
                <Grid item xs={14}>
                    <InternationalClockWidget />
                </Grid>
                <Grid item xs={6}>
                    <LivePlayerWidget />
                    <ForexTableWidget />
                    <TreasuryTableWidget />
                </Grid>
            </Grid>
        </>
    );
}
