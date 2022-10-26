import { CssBaseline, Grid } from '@mui/material'
import Header from 'components/Dashboard/Header'
import ForexTable from './ForexTable'

export default function Landing() {
    return (
        <>
            <CssBaseline />
            <Header />
            <Grid container>
                <Grid item xs={9}></Grid>
                <Grid item xs={3}><ForexTable /></Grid>
            </Grid>
        </>
    )
}
