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

interface ForexConfigProps {
    symbol: string;
    interval: string;
}

export default function Analysis(): React.ReactElement {
    const [data, setData] = React.useState<DefaultDataProps>();
    const params = useParams();

    const assetType = params.assetType;
    const ticker = params.symbolId;

    const baseLineChartId: string = `${ticker}_tickerChart`;

    React.useEffect(() => {
        if (assetType === ASSET_TYPES.FOREX) {
            getHistoricalForex(ticker as string, '1M_S').then(res => {
                const parseTime = d3.timeParse('%Y-%m-%dT%H:%M:%S');
                setData({
                    id: ticker as string,
                    name: ticker as string,
                    parent: true,
                    dataX: res.data.data.map((d: any) => parseTime(d.date)),
                    dataY: res.data.data.map((d: any) => d.mid_close),
                    color: 'white',
                    type: 'pureLine',
                });
            });
        } else if (assetType === ASSET_TYPES.EQUITY) {
            getCandles(ticker as string).then(res => {
                setData({
                    id: ticker,
                    name: ticker,
                    parent: true,
                    dataX: res.data[0].map(
                        (obj: FinnhubCandlesEntrySchema) => new Date(obj.date * 1000)
                    ),
                    dataY: res.data[0].map((obj: FinnhubCandlesEntrySchema) => obj.close),
                    color: 'white',
                    type: 'pureLine',
                } as DefaultDataProps);
            });
        }
    }, []);

    return (
        <>
            <CssBaseline />
            <Navigation />
            <div style={{ height: 700, width: '100%' }}>
                {data ? (
                    <BaseLineChart
                        showAxis
                        showGrid
                        showAverage
                        showTooltip
                        baseId={baseLineChartId}
                        defaultData={data}
                    />
                ) : null}
            </div>
        </>
    );
}
