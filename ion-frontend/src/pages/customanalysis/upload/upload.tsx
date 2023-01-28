import * as React from 'react';
import * as S from '../style';

import MainTableView from './MainTableView';

import Grid from '@mui/material/Grid';
import MainUploadView from './MainUploadView';

export default function Upload() {
    return (
        <Grid container columns={15}>
            <Grid item xs={3}>
                <MainUploadView />
            </Grid>
            <Grid item xs={12}>
                <MainTableView />
            </Grid>
        </Grid>
    );
}
