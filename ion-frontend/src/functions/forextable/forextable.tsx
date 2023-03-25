import * as React from 'react';
import * as d3 from 'd3';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import BaseLineChart from 'components/Charting/BaseChart';

import { Modify } from 'common/types';
import { ColorsEnum } from 'common/theme';
import { ForexStreamType, ForexTableHeaderType, FormattedForexStreamType } from './type';
import { forexStreamStore } from 'store/prices/prices';
import { getWebsocketForex } from 'data/ingestion/forex';
import { StyledTableCell } from 'components/Tables/BaseTable/StyledTableCell';
import { StyledTableRow } from 'components/Tables/BaseTable/StyledTableRow';
import { dataIngestionRequest } from 'services/request';
import { DefaultDataProps } from 'components/Charting/BaseChart/schema/schema';
import { TableCellWrapper } from 'components/Tables/BaseTable/style';
import { ENDPOINTS } from 'common/constant/endpoints';

function ForexTableCellGroup(props: { tableHeaders: ForexTableHeaderType[]; forexPair: string }) {
    const forexStream: FormattedForexStreamType = forexStreamStore(
        (store: any) => store.forexStream[props.forexPair]
    );

    return (
        <>
            {props.tableHeaders.map((key: ForexTableHeaderType, index: number) => {
                const streamKey: keyof FormattedForexStreamType = key.id;
                let data: string | number | null = null;
                let fontColor: string = ColorsEnum.beer;

                if (forexStream !== undefined) {
                    data = streamKey === 'instrument' ? props.forexPair : forexStream[streamKey];
                    if (streamKey === 'closeoutBid' && forexStream.bid_change) {
                        fontColor =
                            forexStream.bid_change > 0
                                ? ColorsEnum.upHint
                                : forexStream.bid_change < 0
                                ? ColorsEnum.downHint
                                : fontColor;
                    }
                    if (streamKey === 'closeoutAsk' && forexStream.ask_change) {
                        fontColor =
                            forexStream.ask_change > 0
                                ? ColorsEnum.upHint
                                : forexStream.ask_change < 0
                                ? ColorsEnum.downHint
                                : fontColor;
                    }
                }

                return (
                    <StyledTableCell key={`${key.id}_${index}`}>
                        <label style={{ color: fontColor }}>{data}</label>
                    </StyledTableCell>
                );
            })}
        </>
    );
}

function ForexHistoricalCell(props: { forexPair: string }) {
    const [data, setData] = React.useState<DefaultDataProps>();

    React.useEffect(() => {
        const parseTime = d3.timeParse('%Y-%m-%dT%H:%M:%S');

        dataIngestionRequest
            .post(ENDPOINTS.PRIVATE.OANDA_FX_HISTORICAL_ENDPOINT, {
                symbol: props.forexPair,
                period: '1M_S',
            })
            .then(data => {
                setData({
                    id: props.forexPair,
                    name: props.forexPair,
                    parent: true,
                    dataX: data.data.data.map((d: any) => parseTime(d.date)),
                    dataY: data.data.data.map((d: any) => d.mid_close),
                    color: 'white',
                    type: 'pureLine',
                });
            });
    }, []);

    return (
        <TableCellWrapper>
            <div style={{ height: '25px'}}>
                {data ? (
                    <BaseLineChart
                        showAverage
                        baseId={`${props.forexPair}_historicalChart`}
                        defaultData={data}
                        width={100}
                        height={30}
                        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                    />
                ) : null}
            </div>
        </TableCellWrapper>
    );
}

export default function ForexTable() {
    const setForexStream = forexStreamStore((store: any) => store.setForexStream);
    const subscribedForexPairs = [
        'EUR_USD',
        'EUR_AUD',
        'EUR_JPY',
        'EUR_NOK',
        'USD_SGD',
        'USD_THB',
        'USD_CAD',
        'USD_JPY',
    ];

    React.useEffect(() => {
        // Subscribe to the forex stream and store in global zustand state store
        const socket = getWebsocketForex();
        socket.listen((x: any) => setForexStream(x));
        return () => socket.close();
    }, []);

    const tableHeaders: Modify<ForexTableHeaderType, { id: keyof ForexStreamType | 'chart' }>[] = [
        { name: 'pair', id: 'instrument', width: 20 },
        { name: 'bid', id: 'closeoutBid', width: 20 },
        { name: 'ask', id: 'closeoutAsk', width: 20 },
        { name: 'spread', id: 'spread', width: 20 },
        { name: '', id: 'chart', width: 20 },
    ];

    return (
        <TableContainer style={{ width: '100%' }}>
            <Table style={{ minWidth: 150 }} aria-label="a dense table">
                <TableHead>
                    <TableRow
                        sx={{
                            backgroundColor: ColorsEnum.coolgray8,
                        }}
                    >
                        {tableHeaders.map(headerSpecification => {
                            return (
                                <StyledTableCell
                                    isHeader
                                    width={headerSpecification.width + '%'}
                                    key={headerSpecification.id}
                                >
                                    {headerSpecification.name}
                                </StyledTableCell>
                            );
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {subscribedForexPairs.map((forexPair: string, index: number) => (
                        <StyledTableRow key={`${forexPair}_row`}>
                            <StyledTableCell key={`${forexPair}_label_${index}`}>
                                <label>{forexPair}</label>
                            </StyledTableCell>
                            <ForexTableCellGroup
                                key={`${forexPair}_${index}`}
                                forexPair={forexPair}
                                tableHeaders={
                                    tableHeaders.filter(
                                        key => !['', 'pair'].includes(key.name)
                                    ) as ForexTableHeaderType[]
                                }
                            />
                            <ForexHistoricalCell
                                key={`${forexPair}_hist_${index}`}
                                forexPair={forexPair}
                            />
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
