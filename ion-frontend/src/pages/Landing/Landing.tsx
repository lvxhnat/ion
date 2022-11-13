import * as React from 'react';

import { CssBaseline, Grid } from '@mui/material';
import TSChart from 'components/Charting/LineCharts/TSChart';
import Header from 'components/Dashboard/Header';
import Footer from 'components/Footer';
import ForexTable from './ForexTable';

export default function Landing(): React.ReactElement {
    return (
        <>
            <CssBaseline />
            <Header />
            <Grid container style={{ height: '90vh', padding: 5 }} spacing={2}>
                <Grid item xl={9} lg={9} xs={9}>
                    <TSChart />
                </Grid>
                <Grid item xl={3} lg={3} xs={3}>
                    <ForexTable />
                </Grid>
            </Grid>
            <Footer dataStreamProvider={'oanda'} />
        </>
    );
}
