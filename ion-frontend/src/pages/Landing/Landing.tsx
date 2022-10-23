import { CssBaseline } from '@mui/material'
import Header from 'components/Dashboard/Header'
import ThemeProvider from 'providers/ThemeProvider'

export default function Landing() {
    return (
        <ThemeProvider>
            <CssBaseline />
            <Header />
        </ThemeProvider>
    )
}
