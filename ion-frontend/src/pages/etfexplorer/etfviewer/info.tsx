import React from 'react';

import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';

import { ETFViewerProps, ModifiedTable } from './etfviewer';

export default function Info(props: ETFViewerProps) {
    return (
        <Grid container columns={20} columnSpacing={2}>
            <Grid item xs={8}>
                <ModifiedTable entry={props.etfData!.info.vitals} title="Vitals" />
            </Grid>
            <Grid item xs={6}>
                <ModifiedTable entry={props.etfData!.info.dbtheme} title="Database Theme" />
            </Grid>
            <Grid item xs={6}>
                <ModifiedTable entry={props.etfData!.info.fact_set} title="Factset Table" />
            </Grid>
            <Grid item xs={10}>
                <ModifiedTable
                    entry={props.etfData!.info.alternative_etfs}
                    title="Alternative ETFs"
                />
            </Grid>
            <Grid item xs={10}>
                <ModifiedTable
                    entry={props.etfData!.info.other_alternative_etfs}
                    title="Other Alternative ETFs"
                />
            </Grid>
        </Grid>
    );
}
