import * as d3 from 'd3';
import * as React from 'react';

import { useParams } from 'react-router-dom';

import CssBaseline from '@mui/material/CssBaseline';
import BaseLineChart from 'components/Charting/BaseChart';
import Navigation from 'components/Navigation';
import { getCandles } from 'data/ingestion/candles';
import { FinnhubCandlesEntrySchema } from 'data/schema/candles';
import { DefaultDataProps } from 'components/Charting/BaseChart/schema/schema';
import { ASSET_TYPES } from 'common/constant';
import { getHistoricalForex } from 'data/ingestion/forex';
import Chartview from 'components/Analysis/Chartview';

interface ForexConfigProps {
    symbol: string;
    interval: string;
}

export default function Analysis(): React.ReactElement {
    const params = useParams();
    console.log(params)
    return (
        <>
            <CssBaseline />
            <Navigation />
            <div style={{ height: 700, width: '100%' }}>
                <Chartview ticker={params.symbolId} assetType={params.assetType as keyof typeof ASSET_TYPES}/>
            </div>
        </>
    );
}
