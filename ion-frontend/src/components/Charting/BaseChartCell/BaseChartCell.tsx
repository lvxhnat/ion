import * as React from 'react';
import * as d3 from 'd3';

import { styled } from '@mui/system';
import TableCell from '@mui/material/TableCell';
import BaseLineChart from 'components/Charting/BaseChart';
import { DefaultDataProps, emptyDefaultDataProps } from '../BaseChart/schema/schema';
import { ASSET_TYPES } from 'common/constant';
import { getHistoricalForex } from 'endpoints/clients/forex';
import { getCandles } from 'endpoints/clients/candles';
import { ForexHistoricalDTO } from 'endpoints/schema/tickers';
import { useTickerDataStore } from 'store/chartview/chartview';

export const TableCellWrapper = styled(TableCell)(({ theme }) => ({
    padding: `${theme.spacing(0.5)} ${theme.spacing(0.5)}`,
    border: 0,
}));

export default function BaseChartCell(props: {
    id?: string;
    data?: DefaultDataProps;
    ticker?: string;
    assetType?: keyof typeof ASSET_TYPES;
}) {
    const [tickerData, setTickerData] = React.useState<DefaultDataProps | undefined>(props.data);
    const [data, setData] = useTickerDataStore(state => [
        props.ticker ? state.data[props.ticker] : undefined,
        state.setData,
    ]);

    const parseTime = d3.timeParse('%Y-%m-%dT%H:%M:%S');

    React.useEffect(() => {
        if (props.assetType && props.ticker) {
            let tickerDataShell = emptyDefaultDataProps();

            if (data) {
                setTickerData(data);
                return;
            }

            if (props.assetType === ASSET_TYPES.FOREX) {
                getHistoricalForex({
                    symbol: props.ticker,
                    granularity: 'D',
                    fromDate: new Date('2022-01-01'),
                }).then(res => {
                    tickerDataShell.dataX = res.data.map(
                        (d: ForexHistoricalDTO) => parseTime(d.date)!
                    );
                    tickerDataShell.dataY = res.data.map((d: ForexHistoricalDTO) => d.close);
                    setTickerData(tickerDataShell);
                    setData({ ticker: props.ticker!, data: tickerDataShell });
                });
            } else if (
                props.assetType === ASSET_TYPES.EQUITY ||
                props.assetType === ASSET_TYPES.ETF
            ) {
                getCandles({
                    symbol: props.ticker,
                    fromDate: new Date('2022-01-01'),
                }).then(res => {
                    tickerDataShell.dataX = res.data.data.map(
                        (d: ForexHistoricalDTO) => parseTime(d.date)!
                    );
                    tickerDataShell.dataY = res.data.data.map((d: ForexHistoricalDTO) => d.close);
                    setTickerData(tickerDataShell);
                    setData({ ticker: props.ticker!, data: tickerDataShell });
                });
            }
            return;
        }
    }, []);

    return (
        <TableCellWrapper id={`${props.ticker}_tickerChartWrapper`}>
            <div style={{ height: '20px' }}>
                {tickerData ? (
                    <BaseLineChart
                        showAverage
                        baseId={props.ticker ?? props.id!}
                        defaultData={tickerData}
                    />
                ) : null}
            </div>
        </TableCellWrapper>
    );
}
