import * as React from 'react';
import * as S from '../../style';

import { Skeleton, Typography } from '@mui/material';

import { useTickerDataStore } from 'store/chart/chart';

import { FredSeriesEntry } from 'endpoints/clients/fred';
import { TickerMetadataDTO } from 'endpoints/clients/database/postgres/query';

import { ASSET_TYPES } from 'common/constant';
import { fetchData, fetchMetadata } from 'common/helper/backend/backend';
import { ChartviewProps } from './type';

import Highcharts, { PointOptionsObject } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useThemeStore } from 'store/theme';
import { ColorsEnum } from 'common/theme';

// TypeScript interface for props
interface ChartProps {
    data: (number | [string | number, number | null] | PointOptionsObject | null)[] | undefined;
    seriesSelected: FredSeriesEntry | undefined;
}

function Chart(props: ChartProps) {
    const themeMode = useThemeStore();
    console.log(props.data);
    const options: Highcharts.Options = {
        chart: {
            type: 'line',
            backgroundColor: 'transparent',
            animation: {
                duration: 2000, // Customize duration of the entrance animation (in milliseconds)
                easing: 'easeOutBounce', // Customize the easing function (see Highcharts documentation for more options)
            },
        },
        title: {
            text: props.seriesSelected?.title,
            style: {
                fontSize: '14px',
            },
        },
        xAxis: {
            type: 'datetime',
            labels: {
                style: { fontSize: '10px' },
            },
        },
        yAxis: {
            title: {
                text: props.seriesSelected?.units,
            },
            labels: {
                style: { fontSize: '10px' },
            },
        },
        legend: {
            enabled: false, // Disable the legend
        },
        series: [
            {
                name: props.seriesSelected?.id,
                data: props.data,
                type: 'line',
                color: themeMode.mode === 'dark' ? ColorsEnum.white : ColorsEnum.black,
                animation: {
                    duration: 2000, // Customize duration of the entrance animation (in milliseconds)
                    easing: 'easeOutBounce', // Customize the easing function
                },
                marker: {
                    enabled: false,
                },
            },
        ],
        credits: {
            enabled: false,
        },
    };
    return (
        <HighchartsReact
            containerProps={{ style: { height: '100%' } }}
            highcharts={Highcharts}
            options={options}
        />
    );
}

/**
 * Provides a historical chart view of a single security selected.
 * @returns
 */
export default function Chartview(props: ChartviewProps) {
    const [data, setData] = useTickerDataStore(state => [state.data, state.setData]);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [rawData, setRawData] = React.useState<{ [col: string]: any }[]>([]);
    const [tickerMetadata, setTickerMetadata] = React.useState<TickerMetadataDTO>();

    const ticker = props.ticker;
    const assetType: keyof typeof ASSET_TYPES = 'FRED';

    React.useEffect(() => {
        setLoading(true);
        fetchMetadata(ticker, assetType).then(res => setTickerMetadata(res.data));
        fetchData(assetType, ticker, new Date('2022-01-01'))?.then((res: any) => {
            setData(res.data);
            setRawData(res.rawData);
            setLoading(false);
        });
    }, [props.ticker]);

    return (
        <S.Item>
            {props.ticker !== '' ? (
                <div style={{ width: '100%', height: '100%' }}>
                    {loading || !data[props.ticker] ? (
                        <Skeleton animation="wave" height="100%" />
                    ) : (
                        <Chart
                            seriesSelected={props.seriesSelected}
                            data={data[props.ticker].dataY.map((val, index) => [
                                data[props.ticker].dataX[index].getTime(),
                                val,
                            ])}
                        />
                    )}
                </div>
            ) : (
                <S.NoDataAvailableContainer>
                    <Typography variant="h3"> No Data Available </Typography>
                    <Typography variant="subtitle1"> Select Series </Typography>
                </S.NoDataAvailableContainer>
            )}
        </S.Item>
    );
}
