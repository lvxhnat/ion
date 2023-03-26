import * as React from 'react'

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { ColorsEnum } from 'common/theme';
import { useTickerDataStore } from 'store/prices/watchlist';
import { useThemeStore } from 'store/theme';
import { TickerSearch } from 'components/Search/Search';

export default function ChartviewToolbar(props: {
    ticker: undefined | string;
}) {
    const {mode} = useThemeStore();
    const data = useTickerDataStore(state => state.data);

  return (
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
  )
}
