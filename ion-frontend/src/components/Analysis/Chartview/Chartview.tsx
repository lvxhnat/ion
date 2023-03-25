import * as React from 'react';

import { Box, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import { getCandles } from 'data/ingestion/candles';
import { FinnhubCandlesEntrySchema } from 'data/schema/candles';
import BaseLineChart from 'components/Charting/BaseChart';
import { TickerSearch } from 'components/Search/Search';
import { ColorsEnum } from 'common/theme';

import { MdWaterfallChart } from 'react-icons/md';
import { useThemeStore } from 'store/theme';
import { useTickerDataStore } from 'store/prices/watchlist';
import { DefaultDataProps } from 'components/Charting/BaseChart/schema/schema';

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
    const { mode } = useThemeStore();
    const [data, setData] = useTickerDataStore(state => [state.data, state.setData]);

    React.useEffect(() => {
        if (props.ticker) {
            const ticker: string = props.ticker;
            getCandles(props.ticker).then(res => {
                const data = res.data[0];
                setData({
                    ticker: ticker,
                    data: {
                        id: props.ticker,
                        name: props.ticker,
                        parent: true,
                        dataX: data.map((obj: FinnhubCandlesEntrySchema) => new Date(obj.date)),
                        dataY: data.map((obj: FinnhubCandlesEntrySchema) => obj.close),
                        color: 'white',
                        type: 'pureLine',
                    } as DefaultDataProps,
                });
            });
        }
    }, []);

    return (
        <Item>
            <Grid
                container
                style={{
                    width: '100%',
                    backgroundColor: mode === 'dark' ? ColorsEnum.warmgray1 : ColorsEnum.coolgray4,
                    padding: '2px',
                }}
                columns={15}
            >
                <Grid item xs={3}>
                    <TickerSearch selectedTicker={props.ticker} />
                </Grid>
                <Grid item xs={11}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        {props.ticker && data[props.ticker] ? (
                            <>
                                <Typography
                                    variant="subtitle1"
                                    component="div"
                                    style={{ paddingLeft: 10, paddingRight: 10 }}
                                >
                                    {props.ticker}
                                </Typography>
                                <Typography
                                    variant="subtitle1"
                                    component="div"
                                    style={{
                                        paddingLeft: 10,
                                        paddingRight: 10,
                                        color: 'white',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    {data[props.ticker].dataY[
                                        data[props.ticker].dataY.length - 1
                                    ].toFixed(2)}
                                </Typography>
                                <Typography
                                    variant="subtitle2"
                                    component="div"
                                    style={{
                                        paddingLeft: 10,
                                        paddingRight: 10,
                                        color:
                                            data[props.ticker].dataY[
                                                data[props.ticker].dataY.length - 1
                                            ] >
                                            data[props.ticker].dataY[
                                                data[props.ticker].dataY.length - 2
                                            ]
                                                ? ColorsEnum.upHint
                                                : ColorsEnum.downHint,
                                    }}
                                >
                                    {(
                                        (100 *
                                            (data[props.ticker].dataY[
                                                data[props.ticker].dataY.length - 1
                                            ] -
                                                data[props.ticker].dataY[
                                                    data[props.ticker].dataY.length - 2
                                                ])) /
                                        data[props.ticker].dataY[
                                            data[props.ticker].dataY.length - 2
                                        ]
                                    ).toFixed(2)}
                                    %
                                </Typography>
                            </>
                        ) : undefined}
                    </div>
                </Grid>
            </Grid>
            {props.ticker && data[props.ticker] ? (
                <div style={{ height: '90%', display: 'flex' }}>
                    <BaseLineChart
                        showAxis
                        showGrid
                        showAverage
                        baseId={`${props.ticker}_tickerChart`}
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
