import * as React from 'react';

import { CssBaseline, Grid } from '@mui/material';
import Navigation from 'components/Navigation';
import Createbar from './createbar';

export default function Page() {
    return (
        <div>
            <CssBaseline />
            <Navigation />
            <Createbar />
            <Grid container></Grid>
        </div>
    );
}
