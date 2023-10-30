import * as React from 'react';
import { Grid } from '@mui/material';
import LivePlayerWidget from './LivePlayer/LivePlayerWidget';
import { ContainerWrapper } from '../../components/Wrappers/ContainerWrapper';

export default function Overview() {
    return (
        <ContainerWrapper>
            <Grid item xs={3}></Grid>
            <Grid item xs={6}></Grid>
            <Grid item xs={3}>
                <LivePlayerWidget />
            </Grid>
        </ContainerWrapper>
    );
}
