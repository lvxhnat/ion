import * as React from 'react';
import * as S from '../../style';

import { Skeleton, Typography } from '@mui/material';

import { useTickerDataStore } from 'store/chart/chart';

import { FredSeriesDataEntry, FredSeriesEntry, getFredSeries } from 'endpoints/clients/fred';

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
                connectNulls: true,
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
    const [data, setData] = React.useState<FredSeriesDataEntry[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);

    const ticker = props.ticker;

    React.useEffect(() => {
        setLoading(true);
        getFredSeries(ticker).then((res: any) => {
            setData(res.data);
            setLoading(false);
        });
    }, [props.ticker]);

    return (
        <S.Item>
            {props.ticker !== '' ? (
                <div style={{ width: '100%', height: '100%' }}>
                    {loading ? (
                        <Skeleton animation="wave" height="100%" />
                    ) : !data ? <></> : (
                        <Chart
                            seriesSelected={props.seriesSelected}
                            data={data.map(val => [new Date(val.date).getTime(), val.value])}
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
