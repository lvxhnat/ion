import * as React from 'react';
import * as S from './style';

import MainTableView from './upload/MainTableView';

import Grid from '@mui/material/Grid';
import MainUploadView from './upload/MainUploadView';

export default function Upload() {
    return (
        <Grid container sx={{ height: '100%' }} columns={15}>
            <Grid item xs={3}>
                <MainUploadView />
            </Grid>
            <Grid item xs={12}>
                <MainTableView />
            </Grid>
        </Grid>
    );
}
