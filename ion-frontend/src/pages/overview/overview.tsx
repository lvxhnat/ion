import * as React from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';

import ForexTable from 'components/Tables/ForexTable';
import Header from 'components/Header';

export default function Overview() {
    return (
        <>
            <Header />
            <CssBaseline />
            <Grid container>
                <Grid item xs={3}>
                    <ForexTable />
                </Grid>
            </Grid>
        </>
    );
}
