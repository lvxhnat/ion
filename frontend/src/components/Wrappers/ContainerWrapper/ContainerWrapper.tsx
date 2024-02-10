import * as React from 'react';

import { Alert, Box, CssBaseline, Grid, Snackbar } from '@mui/material';
import Navigation from 'components/Navigation';
import { ALERTS } from 'common/constant/literals';

export interface ContainerWrapperProps {
    children: React.ReactNode;
}

export default function ContainerWrapper(props: ContainerWrapperProps) {
    const [online, setOnline] = React.useState<boolean>(navigator.onLine);

    if (window.location.href === '/')
        console.log(
            '██╗ ██████╗ ███╗   ██╗    ███████╗███╗   ██╗ ██████╗ ██╗███╗   ██╗███████╗\n██║██╔═══██╗████╗  ██║    ██╔════╝████╗  ██║██╔════╝ ██║████╗  ██║██╔════╝\n██║██║   ██║██╔██╗ ██║    █████╗  ██╔██╗ ██║██║  ███╗██║██╔██╗ ██║█████╗  \n██║██║   ██║██║╚██╗██║    ██╔══╝  ██║╚██╗██║██║   ██║██║██║╚██╗██║██╔══╝  \n██║╚██████╔╝██║ ╚████║    ███████╗██║ ╚████║╚██████╔╝██║██║ ╚████║███████╗\n╚═╝ ╚═════╝ ╚═╝  ╚═══╝    ╚══════╝╚═╝  ╚═══╝ ╚═════╝ ╚═╝╚═╝  ╚═══╝╚══════╝'
        );

    React.useEffect(() => {
        const handleStatusChange = () => setOnline(navigator.onLine);
        window.addEventListener('online', handleStatusChange);
        window.addEventListener('offline', handleStatusChange);
        return () => {
            window.removeEventListener('online', handleStatusChange);
            window.removeEventListener('offline', handleStatusChange);
        };
    }, [online]);

    return (
        <Grid container style={{ height: '100vh' }} flexDirection="column">
            <CssBaseline />
            <Navigation />
            {props.children}
            {!online ? (
                <Snackbar open={true}>
                    <Alert severity="error"> {ALERTS.OFFLINE} </Alert>
                </Snackbar>
            ) : null}
        </Grid>
    );
}
