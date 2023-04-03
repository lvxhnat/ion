import * as React from 'react';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

import { getCandles } from 'data/ingestion/candles';
import { FinnhubCandlesEntrySchema } from 'data/schema/candles';
import BaseLineChart from 'components/Charting/BaseChart';

import { MdWaterfallChart } from 'react-icons/md';
import { useTickerDataStore } from 'store/prices/watchlist';
import { DefaultDataProps } from 'components/Charting/BaseChart/schema/schema';
import { addSimpleMovingAverage } from './calculations/movingAverages';
import ChartviewToolbar from './ChartviewToolbar';

const Item = styled(Box)(({ theme }) => ({
    height: '100%',
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    color: theme.palette.text.secondary,
}));

/**
 * Provides a historical chart view of a single security selected.
 * @returns
 */
export default function Chartview(props: { ticker?: string }) {
    const [data, setData] = useTickerDataStore(state => [state.data, state.setData]);

    const baseLineChartId: string = `${props.ticker}_tickerChart`;

    React.useEffect(() => {
        if (props.ticker) {
            const ticker: string = props.ticker;
            getCandles(props.ticker).then(res => {
                console.log(res.data[0].map(
                    (obj: FinnhubCandlesEntrySchema) => new Date(obj.date * 1000)
                ));
                const tickerData = {
                    ticker: ticker,
                    data: {
                        id: props.ticker,
                        name: props.ticker,
                        parent: true,
                        dataX: res.data[0].map(
                            (obj: FinnhubCandlesEntrySchema) => new Date(obj.date * 1000)
                        ),
                        dataY: res.data[0].map((obj: FinnhubCandlesEntrySchema) => obj.close),
                        color: 'white',
                        type: 'pureLine',
                    } as DefaultDataProps,
                };
                setData(tickerData);
            });
        }
    }, []);

    return (
        <Item>
            <ChartviewToolbar ticker={props.ticker} baseId={baseLineChartId} />
            {props.ticker && data[props.ticker] ? (
                <div style={{ height: '90%', display: 'flex' }}>
                    <BaseLineChart
                        showAxis
                        showGrid
                        showAverage
                        showTooltip
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
