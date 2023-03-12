import * as React from 'react';

import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';

import BaseLineChart from 'components/Charting/BaseChart';
import { DefaultDataProps } from 'components/Charting/BaseChart/schema/schema';
import WidgetContainer from 'components/WidgetContainer';
import { StyledTableCell } from 'components/Tables/BaseTable/StyledTableCell';
import { TableCellWrapper } from 'components/Tables/BaseTable/style';
import { ColorsEnum } from 'common/theme';
import { StyledTableRow } from 'components/Tables/BaseTable/StyledTableRow';
import { getETFCandles } from 'data/ingestion/candles';
import { FinnhubCandlesSchema, FinnhubCandlesEntrySchema } from 'data/schema/candles';
import { ROUTES } from 'common/constant';

export default function Widget() {
    const tickers = ['SPY', 'GPS', 'BABA', 'AAPL', 'TSLA', 'IAU', 'VGLT'];
    const [tickerData, setTickerData] = React.useState<
        {
            ticker: string;
            chartData: DefaultDataProps;
            last_close: string;
            pct_change: number;
        }[]
    >();

    React.useEffect(() => {
        getETFCandles(tickers).then(res => {
            setTickerData(
                res.data.map((entry: FinnhubCandlesSchema) => {
                    return {
                        ticker: entry[0].symbol,
                        chartData: {
                            id: entry[0].symbol,
                            name: entry[0].symbol,
                            parent: true,
                            dataX: entry.map(
                                (obj: FinnhubCandlesEntrySchema) => new Date(obj.date)
                            ),
                            dataY: entry.map((obj: FinnhubCandlesEntrySchema) => obj.close),
                            color: 'white',
                            type: 'pureLine',
                        },
                        last_close: entry[entry.length - 1].close.toFixed(2),
                        pct_change:
                            100 *
                            ((entry[entry.length - 1].close - entry[entry.length - 2].close) /
                                entry[entry.length - 2].close),
                    };
                })
            );
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
                            <StyledTableRow key={`tickerTableBody_${index}`}>
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
                                    <BaseLineChart
                                        showAverage
                                        baseId={`${entry.ticker}_tickerChart`}
                                        defaultData={entry.chartData}
                                        width={100}
                                        height={25}
                                        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                                    />
                                </TableCellWrapper>
                            </StyledTableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </WidgetContainer>
    );
}
