import * as React from 'react';
import { AppBar, Box, Grid, Toolbar } from '@mui/material';
import ToggleThemeMode from './ToggleThemeMode';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../common/routes';

export default function Navigator() {
    const navigate = useNavigate();
    const location = useLocation();
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
