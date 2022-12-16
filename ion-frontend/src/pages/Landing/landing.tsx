import * as React from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import Header from 'components/Header';
import { Grid } from '@mui/material';
import ForexTable from 'components/Tables/ForexTable';
import TreasuryTables from 'components/Tables/Treasury';
import WidgetContainer from 'components/WidgetContainer';
import { InternationalClockWidget } from 'pages/internationalclock';

export default function Landing() {
    return (
        <>
            <CssBaseline />
            <Header />
            <Grid container columns={15} spacing={1}>
                <Grid item xs={10}>
                    <InternationalClockWidget />
                    <Grid container>
                        <WidgetContainer title="us_bill_rates">
                            <TreasuryTables table="us_bill_rates" />
                        </WidgetContainer>
                    </Grid>
                </Grid>
                <Grid item xs={5}>
                    <ForexTable />
                </Grid>
            </Grid>
        </>
    );
}
