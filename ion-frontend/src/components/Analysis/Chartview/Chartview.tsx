import * as React from 'react';

import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import { getCandles } from 'data/ingestion/candles';
import { FinnhubCandlesEntrySchema } from 'data/schema/candles';
import BaseLineChart from 'components/Charting/BaseChart';
import useWindowDimensions from 'common/helper/general';
import { TickerSearch } from 'components/Search/Search';
import { ColorsEnum } from 'common/theme';

import { MdWater, MdWaterfallChart } from 'react-icons/md';
import { useThemeStore } from 'store/theme';

const Item = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    height: '100%',
    color: theme.palette.text.secondary,
}));

const IntegratedToolbar = () => {
    const { mode } = useThemeStore();
    return (
        <div
            style={{
                width: '100%',
                backgroundColor: mode === 'dark' ? ColorsEnum.warmgray1 : ColorsEnum.coolgray4,
                padding: '2px',
            }}
        >
            <TickerSearch />
        </div>
    );
};

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
    // <img src={Logo} style={{ width: '7vw', opacity: 0.5 }} />
    return (
        <Item sx={{ flexGrow: 1 }}>
            <IntegratedToolbar />
            {props.ticker ? (
                chartData ? (
                    <BaseLineChart
                        showLegend
                        showAxis
                        showTooltip
                        showAverage
                        baseId={`${props.ticker}_tickerChart`}
                        defaultData={chartData}
                        width={1000}
                        height={300}
                        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                    />
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
