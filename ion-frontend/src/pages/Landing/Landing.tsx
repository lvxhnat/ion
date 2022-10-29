import { CssBaseline, Grid } from '@mui/material'
import Header from 'components/Dashboard/Header'
import Footer from 'components/Footer'
import ForexTable from './ForexTable'

export default function Landing() {
    return (
        <>
            <CssBaseline />
            <Header />
            <Grid container style={{ height: "90vh" }}>
                <Grid item xl={9} lg={8} xs={8}></Grid>
                <Grid item xl={3} lg={4} xs={4}><ForexTable /></Grid>
            </Grid>
            <Footer dataStreamProvider={"oanda"} />
        </>
    )
}
