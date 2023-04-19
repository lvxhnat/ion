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

export default function Widget() {
    const navigate = useNavigate();
    const tickers = ['SPY', 'GPS', 'BABA', 'AAPL', 'TSLA', 'IAU', 'VGLT'];
    const [tickerData, setTickerData] = React.useState<
        {
            ticker: string;
            chartData: DefaultDataProps;
            last_close: string;
            pct_change: number;
        }[]
    >([]);

    React.useEffect(() => {
        tickers.map((ticker: string) => {
            getCandles(ticker).then(res => {
                const entry = res.data;
                const newTickerData = [...tickerData];
                newTickerData.push({
                    ticker: ticker,
                    chartData: {
                        id: ticker,
                        name: ticker,
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
                setTickerData(newTickerData);
            });
        });
    }, []);

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
                    {tickerData?.map((entry, index: number) => {
                        return (
                            <StyledTableRow
                                key={`tickerTableBody_${index}`}
                                onClick={() =>
                                    navigate(
                                        `${ROUTES.PUBLIC.ANALYSIS}/${ASSET_TYPES.EQUITY}/${entry.ticker}`
                                    )
                                }
                            >
                                <StyledTableCell>{entry.ticker}</StyledTableCell>
                                <StyledTableCell
                                    color={
                                        entry.pct_change > 0
                                            ? ColorsEnum.upHint
                                            : ColorsEnum.downHint
                                    }
                                >
                                    {entry.pct_change.toFixed(2)}%
                                </StyledTableCell>
                                <StyledTableCell>{entry.last_close}</StyledTableCell>
                                <TableCellWrapper id={`${entry.ticker}_tickerChartWrapper`}>
                                    <div style={{ height: '25px' }}>
                                        <BaseLineChart
                                            showAverage
                                            baseId={`${entry.ticker}_tickerChart`}
                                            defaultData={entry.chartData}
                                        />
                                    </div>
                                </TableCellWrapper>
                            </StyledTableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </WidgetContainer>
    );
}
