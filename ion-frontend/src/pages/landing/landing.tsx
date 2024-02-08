import * as React from 'react';

import Grid from '@mui/material/Grid';
import CssBaseline from '@mui/material/CssBaseline';

import Navigation from 'components/Navigation';

import { TreasuryTableWidget } from './treasurytable';
import { ForexTableWidget } from './forextable';
import { InternationalClockWidget } from './internationalclock';
import { WatchlistWidget } from './watchlist';
import LivePlayer from './liveplayer';
import HealthChecks from './healthchecks';

export default function Landing() {
    console.log(
        '██╗ ██████╗ ███╗   ██╗    ███████╗███╗   ██╗ ██████╗ ██╗███╗   ██╗███████╗\n██║██╔═══██╗████╗  ██║    ██╔════╝████╗  ██║██╔════╝ ██║████╗  ██║██╔════╝\n██║██║   ██║██╔██╗ ██║    █████╗  ██╔██╗ ██║██║  ███╗██║██╔██╗ ██║█████╗  \n██║██║   ██║██║╚██╗██║    ██╔══╝  ██║╚██╗██║██║   ██║██║██║╚██╗██║██╔══╝  \n██║╚██████╔╝██║ ╚████║    ███████╗██║ ╚████║╚██████╔╝██║██║ ╚████║███████╗\n╚═╝ ╚═════╝ ╚═╝  ╚═══╝    ╚══════╝╚═╝  ╚═══╝ ╚═════╝ ╚═╝╚═╝  ╚═══╝╚══════╝'
    );
    return (
        <>
            <CssBaseline />
            <Navigation />
            <Grid container columns={25} spacing={1}>
                <Grid item xs={5}></Grid>
                <Grid item xs={14}></Grid>
                <Grid item xs={6}>
                    <LivePlayer />
                </Grid>
            </Grid>
        </>
    );
}
