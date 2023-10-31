import * as React from 'react';

import { Alert, Box, CssBaseline, Grid, Snackbar } from '@mui/material';
import Navigator from '../../Navigator/Navigator';
import { ContainerWrapperProps } from '../../Navigator/type';
import { ALERTS } from '../../../common/literals';
import SideDrawer from '../../SideDrawer/SideDrawer';
import { useDrawerStore } from '../../../store/ui';

export default function ContainerWrapper(props: ContainerWrapperProps) {
    const [online, setOnline] = React.useState<boolean>(navigator.onLine);
    const [drawerOpen, setDrawerOpen] = useDrawerStore(state => [state.drawerOpen, state.setDrawerOpen]);

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
            <Navigator />
            <Grid container flexDirection="row" >
                <SideDrawer
                    drawerWidth={240}
                    open={drawerOpen}
                    handleDrawerClose={() => setDrawerOpen(false)}
                    handleDrawerOpen={() => setDrawerOpen(true)}
                />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    {props.children}
                </Box>
            </Grid>
            {!online ? (
                <Snackbar open={true}>
                    <Alert severity="error"> {ALERTS.OFFLINE} </Alert>
                </Snackbar>
            ) : null}
        </Grid>
    );
}
