import * as React from 'react';
import * as S from '../style';

import { Typography } from '@mui/material';

import { useTickerDataStore } from 'store/chartview/chartview';
import { useBaseChartStore } from 'store/chartview/basechart';

import { ASSET_TYPES } from 'common/constant';
import { getChartviewBaseChartId } from 'common/constant/ids';
import { TickerMetadataDTO } from 'endpoints/clients/database/postgres/query';

import DataTable from '../datatable';
import BaseLineChart from 'components/Charting/BaseChart';
import NoDataSkeleton from 'components/Skeletons/NoDataSkeleton';
import ChartviewPriceShower from './ChartviewPriceShower';
import ChartviewToolbar from './ChartviewToolbar';

import { fetchData, fetchMetadata } from '../general/endpoints';
import { ChartviewProps } from '../type';

/**
 * Provides a historical chart view of a single security selected.
 * @returns
 */
export default function Chartview(props: ChartviewProps) {
    const [data, setData] = useTickerDataStore(state => [state.data, state.setData]);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [rawData, setRawData] = React.useState<{ [col: string]: any }[]>([]);
    const [showSidebar, setShowSidebar] = React.useState<boolean>(false);
    const [tickerMetadata, setTickerMetadata] = React.useState<TickerMetadataDTO>();
    const [dateSelected, setDateSelected] = React.useState<Date>(new Date('2022-01-01')); // Default 2022 Jan

    const addChartPlot = useBaseChartStore(state => state.addChartPlot);
    const baseLineChartId: string = getChartviewBaseChartId(props.ticker);

    const ticker = props.ticker ?? 'SPY';
    const assetType: keyof typeof ASSET_TYPES =
        props.assetType ?? (ASSET_TYPES.ETF as keyof typeof ASSET_TYPES);

    React.useEffect(() => {
        setLoading(true);

        addChartPlot({
            parentTicker: ticker,
            plot: {
                baseId: baseLineChartId,
                ticker: ticker,
                color: 'white',
                type: 'line',
            },
        });

        fetchMetadata(ticker, assetType).then(res => setTickerMetadata(res.data));
        fetchData(assetType, ticker, dateSelected)?.then((res: any) => {
            setData(res.data);
            setRawData(res.rawData);
            setLoading(false);
        });
    }, [dateSelected, props.ticker]);

    return (
        <S.Item>
            {tickerMetadata ? (
                <ChartviewToolbar
                    baseId={baseLineChartId}
                    showSidebar={showSidebar}
                    tickerMetadata={tickerMetadata}
                    setShowSidebar={setShowSidebar}
                    setDateSelected={setDateSelected}
                />
            ) : null}
            {props.ticker && data[props.ticker] ? (
                <div style={{ height: '100%', display: 'flex' }}>
                    {rawData.length !== 0 ? (
                        <div style={{ width: '25%', display: showSidebar ? 'flex' : 'none' }}>
                            <DataTable data={rawData} columns={Object.keys(rawData[0])} />
                        </div>
                    ) : (
                        <></>
                    )}
                    <div style={{ width: showSidebar ? '75%' : '100%', height: '100%' }}>
                        <ChartviewPriceShower ticker={props.ticker} />
                        {loading && data[props.ticker].dataX.length > 10 ? (
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexDirection: 'column',
                                    opacity: '50%',
                                    height: '100%',
                                }}
                            >
                                <Typography variant="subtitle2">Loading Data</Typography>
                            </div>
                        ) : (
                            <BaseLineChart
                                showAxis
                                showGrid
                                showAverage
                                showTooltip
                                showEndTags
                                baseId={baseLineChartId}
                                defaultData={data[props.ticker]}
                            />
                        )}
                    </div>
                </div>
            ) : (
                <NoDataSkeleton text="Enter a symbol" />
            )}
        </S.Item>
    );
}
