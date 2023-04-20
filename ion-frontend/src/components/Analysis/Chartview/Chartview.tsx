import * as React from 'react';
import * as d3 from 'd3';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

import { getCandles } from 'data/ingestion/candles';
import { EquityHistoricalDTO, ForexHistoricalDTO } from 'data/schema/tickers';
import BaseLineChart from 'components/Charting/BaseChart';

import { MdWaterfallChart } from 'react-icons/md';
import { useTickerDataStore } from 'store/prices/watchlist';
import { DefaultDataProps } from 'components/Charting/BaseChart/schema/schema';
import ChartviewToolbar from './ChartviewToolbar';
import { ASSET_TYPES } from 'common/constant';
import { getHistoricalForex } from 'data/ingestion/forex';
import ChartviewPriceShower from './ChartviewPriceShower';

const Item = styled(Box)(({ theme }) => ({
    height: '100%',
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    color: theme.palette.text.secondary,
}));

/**
 * Provides a historical chart view of a single security selected.
 * @returns
 */
export default function Chartview(props: {
    assetType?: keyof typeof ASSET_TYPES;
    ticker?: string;
}) {
    const [data, setData] = useTickerDataStore(state => [state.data, state.setData]);

    const baseLineChartId: string = `${props.ticker}_tickerChart`;

    React.useEffect(() => {
        const ticker = props.ticker ? props.ticker : 'SPY';
        const assetType: keyof typeof ASSET_TYPES = props.assetType
            ? props.assetType
            : (ASSET_TYPES.ETF as keyof typeof ASSET_TYPES);
        const parseTime = d3.timeParse('%Y-%m-%dT%H:%M:%S');

        if (assetType === ASSET_TYPES.FOREX) {
            getHistoricalForex(ticker, '1M', 'D').then(res => {
                setData({
                    ticker: ticker as string,
                    data: {
                        id: ticker,
                        name: ticker,
                        parent: true,
                        dataX: res.data.map((d: ForexHistoricalDTO) => parseTime(d.date)),
                        dataY: res.data.map((d: ForexHistoricalDTO) => d.close),
                        color: 'white',
                        type: 'pureLine',
                    } as DefaultDataProps,
                });
            });
        } else if (assetType === ASSET_TYPES.EQUITY) {
            getCandles(ticker).then(res => {
                setData({
                    ticker: ticker as string,
                    data: {
                        id: ticker,
                        name: ticker,
                        parent: true,
                        dataX: res.data.map((d: EquityHistoricalDTO) => parseTime(d.date)),
                        dataY: res.data.map((d: EquityHistoricalDTO) => d.close),
                        color: 'white',
                        type: 'pureLine',
                    } as DefaultDataProps,
                });
            });
        }
    }, []);

    return (
        <Item>
            <ChartviewToolbar ticker={props.ticker} baseId={baseLineChartId} />
            {props.ticker && data[props.ticker] ? (
                <div style={{ height: '90%' }}>
                    <ChartviewPriceShower ticker={props.ticker} />
                    <BaseLineChart
                        showAxis
                        showGrid
                        showAverage
                        showTooltip
                        showMetrics
                        baseId={baseLineChartId}
                        defaultData={data[props.ticker]}
                    />
                </div>
            ) : (
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '80%',
                        opacity: 0.5,
                    }}
                >
                    <MdWaterfallChart
                        style={{ width: 'calc(25px + 0.5vw)', height: 'calc(25px + 0.5vw)' }}
                    />
                    <Typography variant="subtitle2" component="div">
                        {' '}
                        Enter a symbol{' '}
                    </Typography>
                </div>
            )}
        </Item>
    );
}
