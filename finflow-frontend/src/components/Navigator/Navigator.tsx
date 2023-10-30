import * as React from 'react';
import { AppBar, Box, Grid, Toolbar } from '@mui/material';
import ToggleThemeMode from './ToggleThemeMode';

export default function Navigator() {
    return (
        <Toolbar>
            <AppBar>
                <Grid container padding={1}>
                    <Grid item xs={6}></Grid>
                    <Grid item xs={6}>
                        <Box
                            display="flex"
                            justifyContent="flex-end"
                            alignItems="center"
                            gap={2}
                            paddingRight={2}
                        >
                            <ToggleThemeMode />
                        </Box>
                    </Grid>
                </Grid>
            </AppBar>
        </Toolbar>
    );
}
