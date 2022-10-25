import { CssBaseline, Grid } from '@mui/material'
import Dashboard from 'components/Dashboard/Dashboard'
import Header from 'components/Dashboard/Header'
import ThemeProvider from 'providers/ThemeProvider'
import ForexTable from './ForexTable'

export default function Landing() {
    return (
        <>
            <CssBaseline />
            <Header />
            <Grid container>
                <Grid item xs={8}></Grid>
                <Grid item xs={4}><ForexTable /></Grid>
            </Grid>
        </>
    )
}
