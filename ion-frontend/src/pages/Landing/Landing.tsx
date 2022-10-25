import { CssBaseline } from '@mui/material'
import Dashboard from 'components/Dashboard/Dashboard'
import Header from 'components/Dashboard/Header'
import ThemeProvider from 'providers/ThemeProvider'

export default function Landing() {
    return (
        <>
            <CssBaseline />
            <Header />
            <Dashboard />
        </>
    )
}
