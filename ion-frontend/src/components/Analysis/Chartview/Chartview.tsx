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
    const [chartData, setChartData] = React.useState<any>();

    React.useEffect(() => {
        if (props.ticker) {
            getCandles(props.ticker).then(res => {
                const data = res.data[0];
                setChartData({
                    id: props.ticker,
                    name: props.ticker,
                    parent: true,
                    dataX: data.map((obj: FinnhubCandlesEntrySchema) => new Date(obj.date)),
                    dataY: data.map((obj: FinnhubCandlesEntrySchema) => obj.close),
                    color: 'white',
                    type: 'pureLine',
                });
            });
        }
    }, []);
    // <img src={Logo} style={{ width: '7vw', opacity: 0.5 }} />
    return (
        <Item>
            <Grid container
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
                    {chartData ? (
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
                                {chartData.dataY[chartData.dataY.length - 1].toFixed(2)}
                            </Typography>
                            <Typography
                                variant="subtitle2"
                                component="div"
                                style={{
                                    paddingLeft: 10,
                                    paddingRight: 10,
                                    color:
                                        chartData.dataY[chartData.dataY.length - 1] >
                                        chartData.dataY[chartData.dataY.length - 2]
                                            ? ColorsEnum.upHint
                                            : ColorsEnum.downHint,
                                }}
                            >
                                {(
                                    (100 *
                                        (chartData.dataY[chartData.dataY.length - 1] -
                                            chartData.dataY[chartData.dataY.length - 2])) /
                                    chartData.dataY[chartData.dataY.length - 2]
                                ).toFixed(2)}
                                %
                            </Typography>
                        </>
                    ) : undefined}
                </div>
                </Grid>
            </Grid>
            {props.ticker ? (
                chartData ? (
                    <div style={{ height: '90%'}}>
                    <BaseLineChart
                        showAxis
                        showAverage
                        baseId={`${props.ticker}_tickerChart`}
                        defaultData={chartData}
                        width={1000}
                        height={450}
                        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                    />
                    </div>
                ) : null
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
