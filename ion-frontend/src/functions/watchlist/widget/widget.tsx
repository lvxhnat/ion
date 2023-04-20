import * as React from 'react';

import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';

import { useNavigate } from 'react-router-dom';

import BaseLineChart from 'components/Charting/BaseChart';
import { DefaultDataProps } from 'components/Charting/BaseChart/schema/schema';
import WidgetContainer from 'components/WidgetContainer';
import { StyledTableCell } from 'components/Tables/BaseTable/StyledTableCell';
import { TableCellWrapper } from 'components/Tables/BaseTable/style';
import { ColorsEnum } from 'common/theme';
import { StyledTableRow } from 'components/Tables/BaseTable/StyledTableRow';
import { getCandles } from 'data/ingestion/candles';
import { ASSET_TYPES, ROUTES } from 'common/constant';
import { EquityHistoricalDTO } from 'data/schema/tickers';

function WidgetTickerRow(props: { ticker: string }) {
    const [data, setData] = React.useState<{
        ticker: string;
        chartData: DefaultDataProps;
        last_close: string;
        pct_change: number;
    }>();
    const navigate = useNavigate();

    React.useEffect(() => {
        getCandles(props.ticker).then(res => {
            const entry = res.data;
            setData({
                ticker: props.ticker,
                chartData: {
                    id: props.ticker,
                    name: props.ticker,
                    parent: true,
                    dataX: res.data.map((obj: EquityHistoricalDTO) => new Date(obj.date)),
                    dataY: res.data.map((obj: EquityHistoricalDTO) => obj.close),
                    color: 'white',
                    type: 'pureLine',
                },
                last_close: res.data[res.data.length - 1].close.toFixed(2),
                pct_change:
                    100 *
                    ((entry[entry.length - 1].close - entry[entry.length - 2].close) /
                        entry[entry.length - 2].close),
            });
        });
    }, []);

    return data ? (
        <StyledTableRow
            key={`tickerTableBody_${data.ticker}`}
            onClick={() =>
                navigate(`${ROUTES.PUBLIC.ANALYSIS}/${ASSET_TYPES.EQUITY}/${data.ticker}`)
            }
        >
            <StyledTableCell>{data.ticker}</StyledTableCell>
            <StyledTableCell color={data.pct_change > 0 ? ColorsEnum.upHint : ColorsEnum.downHint}>
                {data.pct_change.toFixed(2)}%
            </StyledTableCell>
            <StyledTableCell>{data.last_close}</StyledTableCell>
            <TableCellWrapper id={`${data.ticker}_tickerChartWrapper`}>
                <div style={{ height: '25px' }}>
                    <BaseLineChart
                        showAverage
                        baseId={`${data.ticker}_tickerChart`}
                        defaultData={data.chartData}
                    />
                </div>
            </TableCellWrapper>
        </StyledTableRow>
    ) : (
        <></>
    );
}
export default function Widget() {
    const tickers = ['SPY', 'GPS', 'BABA', 'AAPL', 'TSLA', 'IAU', 'VGLT'];

    return (
        <WidgetContainer
            title="ticker_watchlist"
            fullScreenRedirect={ROUTES.PUBLIC.TICKER_WATCHLIST}
        >
            <Table style={{ minWidth: 150 }} aria-label="a dense table" stickyHeader>
                <TableHead>
                    <TableRow sx={{ backgroundColor: ColorsEnum.coolgray8 }}>
                        <StyledTableCell isHeader key={`tickerTableHeader_0`}>
                            Ticker
                        </StyledTableCell>
                        <StyledTableCell isHeader key={`tickerTableHeader_1`}>
                            Change (%)
                        </StyledTableCell>
                        <StyledTableCell isHeader key={`tickerTableHeader_2`}>
                            Last Close
                        </StyledTableCell>
                        <StyledTableCell width="30%" isHeader key={`tickerTableHeader_3`}>
                            Chart
                        </StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tickers.map((ticker: string) => (
                        <WidgetTickerRow key={`WidgetTickerRow_${ticker}`} ticker={ticker} />
                    ))}
                </TableBody>
            </Table>
        </WidgetContainer>
    );
}
