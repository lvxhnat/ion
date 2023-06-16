import * as React from 'react';
import * as d3 from 'd3';

import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

import { getCandles } from 'endpoints/clients/candles';
import { ForexHistoricalDTO, OHLCHistoricalDTO } from 'endpoints/schema/tickers';
import BaseLineChart from 'components/Charting/BaseChart';
import ChartviewPriceShower from './ChartviewPriceShower';
import ChartviewToolbar from './ChartviewToolbar';

import { useChartStore, useTickerDataStore } from 'store/chartview/chartview';
import { DefaultDataProps } from 'components/Charting/BaseChart/schema/schema';
import { ASSET_TYPES } from 'common/constant';
import { getHistoricalForex } from 'endpoints/clients/forex';
import DataTable from './datatable';
import NoDataSkeleton from 'components/Skeletons/NoDataSkeleton';
import { TickerMetadataDTO, getTickerMetadata } from 'endpoints/clients/database/postgres/ticker';

const Item = styled(Box)(({ theme }) => ({
    height: '100%',
    color: theme.palette.text.secondary,
}));

export const getChartviewBaseChartId = (ticker: string | undefined) => `${ticker}__tickerChart`;

/**
 * Provides a historical chart view of a single security selected.
 * @returns
 */
export default function Chartview(props: {
    assetType?: keyof typeof ASSET_TYPES;
    ticker?: string;
}) {
    const [data, setData] = useTickerDataStore(state => [state.data, state.setData]);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [rawData, setRawData] = React.useState<{ [col: string]: any }[]>([]);
    const [showSidebar, setShowSidebar] = React.useState<boolean>(false);
    const [tickerMetadata, setTickerMetadata] = React.useState<TickerMetadataDTO>();
    const addChart = useChartStore(state => state.setChart);

    const baseLineChartId: string = getChartviewBaseChartId(props.ticker);

    React.useEffect(() => {
        setLoading(true);
        const fromDate = new Date('2022-01-01');
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

        if (props.ticker && props.assetType) {
            getTickerMetadata({
                symbol: props.ticker,
                asset_class: props.assetType,
            }).then(res => {
                setTickerMetadata(res.data);
            });
        }

        if (assetType.toLowerCase() === ASSET_TYPES.FOREX.toLowerCase()) {
            getHistoricalForex({
                symbol: ticker,
                granularity: 'D',
                fromDate: fromDate,
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
                setLoading(false);
            });
        } else if (
            assetType.toLowerCase() === ASSET_TYPES.EQUITY.toLowerCase() ||
            assetType.toLowerCase() === ASSET_TYPES.ETF.toLowerCase()
        ) {
            getCandles(ticker).then(res => {
                const data = res.data.data;
                setData({
                    ticker: ticker as string,
                    data: {
                        id: ticker,
                        name: ticker,
                        parent: true,
                        dataX: data.map((d: OHLCHistoricalDTO) => parseTime(d.date)),
                        dataY: data.map((d: OHLCHistoricalDTO) => d.close),
                        color: 'white',
                        type: 'line',
                    } as DefaultDataProps,
                });
                setRawData(data);
                setLoading(false);
            });
        }
    }, [props.ticker]);

    return (
        <Item>
            {!loading && tickerMetadata ? (
                <ChartviewToolbar
                    baseId={baseLineChartId}
                    showSidebar={showSidebar}
                    tickerMetadata={tickerMetadata}
                    setShowSidebar={setShowSidebar}
                />
            ) : null}
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
                            showEndTags
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
