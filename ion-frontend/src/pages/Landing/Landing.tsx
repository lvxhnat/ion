import * as React from 'react';

import { Box, CssBaseline, Grid } from '@mui/material';
import TSChart from 'components/Charting/LineCharts/TSChart';
import Header from 'components/Header';
import Footer from 'components/Footer';
import ForexTable from './ForexTable';

export default function Landing(): React.ReactElement {
    return (
        <Grid sx={{ overflow: 'hidden' }}>
            <CssBaseline />
            <Header />
            <Grid container style={{ height: '90vh', padding: 5, minWidth: '1000px' }} spacing={2}>
                <Grid item xl={9} lg={9} xs={12}>
                    <TSChart />
                </Grid>
                <Box
                    component={Grid}
                    item
                    xl={3}
                    lg={3}
                    xs={0}
                    style={{ height: '100vh' }}
                    display={{ md: 'none', xs: 'none', lg: 'block' }}
                >
                    <ForexTable />
                </Box>
            </Grid>
            <Footer dataStreamProvider={'oanda'} />
        </Grid>
    );
}
