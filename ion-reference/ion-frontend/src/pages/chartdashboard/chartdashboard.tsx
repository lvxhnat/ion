import * as React from 'react';

import { CssBaseline } from '@mui/material';
import Navigation from 'components/Navigation';
import { useLocation } from 'react-router-dom';
import { MultiChartview } from 'components/Analysis/Chartview';

export default function ChartDashboard() {
    const { state } = useLocation();

    return (
        <>
            <CssBaseline />
            <Navigation />
            <div style={{ height: 700, width: '100%' }}>
                {state ? (
                    <MultiChartview ticker={state.ticker} assetType={state.assetType} />
                ) : null}
            </div>
        </>
    );
}
