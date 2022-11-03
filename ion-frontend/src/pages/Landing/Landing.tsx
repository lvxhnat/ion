import * as d3 from 'd3';
import * as React from 'react';

import { CssBaseline, Grid } from '@mui/material';
import LineChart from 'components/Charting/LineChart';
import Header from 'components/Dashboard/Header';
import Footer from 'components/Footer';
import ForexTable from './ForexTable';

export default function Landing() {

    const [data, setData] = React.useState([]);

    React.useEffect(() => {
        d3.csv('https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv').then((d: any) => setData(d))
    }, [])

    return (
        <>
            <CssBaseline />
            <Header />
            <Grid container style={{ height: "90vh" }} spacing={1}>
                <Grid item xl={9} lg={9} xs={8}>
                    <LineChart data={data} />
                </Grid>
                <Grid item xl={3} lg={3} xs={3}>
                    <ForexTable />
                </Grid>
            </Grid>
            <Footer dataStreamProvider={"oanda"} />
        </>
    )
}
