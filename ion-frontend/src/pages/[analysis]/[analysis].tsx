import * as d3 from 'd3';
import * as React from 'react';

import { useParams } from 'react-router-dom';

import CssBaseline from '@mui/material/CssBaseline';
import Navigation from 'components/Navigation';
import { ASSET_TYPES } from 'common/constant';
import Chartview from 'components/Analysis/Chartview';

export default function Analysis(): React.ReactElement {
    const params = useParams();
    return (
        <>
            <CssBaseline />
            <Navigation />
            <div style={{ height: 700, width: '100%' }}>
                <Chartview
                    ticker={params.symbolId}
                    assetType={params.assetType as keyof typeof ASSET_TYPES}
                />
            </div>
        </>
    );
}
