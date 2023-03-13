import * as React from 'react';

import Logo from 'static/logo.png';
import { getCandles } from 'data/ingestion/candles';
import { FinnhubCandlesEntrySchema } from 'data/schema/candles';

import BaseLineChart from 'components/Charting/BaseChart';
import useWindowDimensions from 'common/helper/general';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { TickerSearch } from 'components/Search/Search';
import { ColorsEnum } from 'common/theme';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    textAlign: 'center',
    height: '100%',
    color: theme.palette.text.secondary,
}));

const IntegratedToolbar = () => {
    return (
        <div style={{ width: '100%', backgroundColor: ColorsEnum.warmgray1, padding: '2px' }}>
            <TickerSearch />
        </div>
    )
}

/**
 * Provides a historical chart view of a single security selected.
 * @returns
 */
export default function Chartview(props: { ticker?: string }) {
    const { height, width } = useWindowDimensions();
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

    return (
        <Item>
            <IntegratedToolbar />
            {props.ticker ? (
                <div>
                    {chartData ? (
                        <BaseLineChart
                            showLegend
                            showAxis
                            showTooltip
                            showAverage
                            baseId={`${props.ticker}_tickerChart`}
                            defaultData={chartData}
                            width={width}
                            height={height / 1.5}
                            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                        />
                    ) : null}
                </div>
            ) : (
                <div
                    style={{
                        display: 'flex',
                        height: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <img src={Logo} style={{ width: '7vw', opacity: 0.5 }} />
                </div>
            )}
        </Item>
    );
}
