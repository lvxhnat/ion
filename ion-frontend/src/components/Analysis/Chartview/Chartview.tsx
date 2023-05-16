import * as React from 'react';
import * as d3 from 'd3';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

import { getCandles } from 'endpoints/clients/candles';
import { EquityHistoricalDTO, ForexHistoricalDTO } from 'endpoints/schema/tickers';
import BaseLineChart from 'components/Charting/BaseChart';
import ChartviewPriceShower from './ChartviewPriceShower';
import ChartviewToolbar from './ChartviewToolbar';

import { useChartStore, useTickerDataStore } from 'store/chartview/chartview';
import { DefaultDataProps } from 'components/Charting/BaseChart/schema/schema';
import { ASSET_TYPES } from 'common/constant';
import { getHistoricalForex } from 'endpoints/clients/forex';
import DataTable from './datatable';
import NoDataSkeleton from 'components/Skeletons/NoDataSkeleton';

const Item = styled(Box)(({ theme }) => ({
    height: '100%',
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
    const [rawData, setRawData] = React.useState<{ [col: string]: any }[]>([]);
    const [showSidebar, setShowSidebar] = React.useState<boolean>(false);
    const addChart = useChartStore(state => state.setChart);

    const baseLineChartId: string = `${props.ticker}__tickerChart`;

    React.useEffect(() => {
        const ticker = props.ticker ? props.ticker : 'SPY';
        const assetType: keyof typeof ASSET_TYPES = props.assetType
            ? props.assetType
            : (ASSET_TYPES.ETF as keyof typeof ASSET_TYPES);
        const parseTime = d3.timeParse('%Y-%m-%dT%H:%M:%S');

        addChart({
            ticker: ticker,
            chart: {
                color: 'white',
                type: 'line',
            },
        });

        if (assetType === ASSET_TYPES.FOREX) {
            getHistoricalForex({
                symbol: ticker,
                count: 50,
                granularity: 'D',
            }).then(res => {
                setData({
                    ticker: ticker as string,
                    data: {
                        id: ticker,
                        name: ticker,
                        parent: true,
                        dataX: res.data.map((d: ForexHistoricalDTO) => parseTime(d.date)),
                        dataY: res.data.map((d: ForexHistoricalDTO) => d.close),
                        color: 'white',
                        type: 'line',
                    } as DefaultDataProps,
                });
                setRawData(res.data);
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
                        type: 'line',
                    } as DefaultDataProps,
                });
                setRawData(res.data);
            });
        }
    }, []);

    return (
        <Item>
            <ChartviewToolbar
                ticker={props.ticker}
                baseId={baseLineChartId}
                assetType={props.assetType}
                showSidebar={showSidebar}
                setShowSidebar={setShowSidebar}
            />
            {props.ticker && data[props.ticker] && rawData.length !== 0 ? (
                <div style={{ height: '100%', display: 'flex' }}>
                    <div style={{ width: '25%', display: showSidebar ? 'flex' : 'none' }}>
                        <DataTable data={rawData} columns={Object.keys(rawData[0])} />
                    </div>
                    <div style={{ width: showSidebar ? '75%' : '100%', height: '100%' }}>
                        <ChartviewPriceShower ticker={props.ticker} />
                        <BaseLineChart
                            showXAxis
                            showYAxis
                            showGrid
                            showAverage
                            showTooltip
                            showMetrics
                            baseId={baseLineChartId}
                            defaultData={data[props.ticker]}
                        />
                    </div>
                </div>
            ) : (
                <NoDataSkeleton text="Enter a symbol" />
            )}
        </Item>
    );
}
