import * as S from './style';
import * as React from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { Modify } from 'common/types';
import { ColorsEnum } from 'common/theme';
import { forexStreamStore } from 'store/chartview/forex';
import { getWebsocketForex } from 'endpoints/clients/forex';
import { StyledTableCell } from 'components/Tables/BaseTable/StyledTableCell';
import { StyledTableRow } from 'components/Tables/BaseTable/StyledTableRow';
import { useNavigate } from 'react-router-dom';
import { ASSET_TYPES, ROUTES } from 'common/constant';
import BaseChartCell from 'components/Charting/BaseChartCell';
import { ForexStreamType, ForexTableHeaderType, FormattedForexStreamType } from './type';

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

export default function ForexTable(props: { height?: string }) {
    const navigate = useNavigate();
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
        <S.StyledTableContainer style={{ width: '100%', height: props.height ?? 'auto' }}>
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
                        <StyledTableRow
                            key={`${forexPair}_row`}
                            onClick={() =>
                                navigate(
                                    `${ROUTES.PUBLIC.SECURITIES}/${ASSET_TYPES.FOREX}/${forexPair}`
                                )
                            }
                        >
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
                            <BaseChartCell
                                key={`${forexPair}_hist_${index}`}
                                ticker={forexPair}
                                assetType={ASSET_TYPES.FOREX as keyof typeof ASSET_TYPES}
                            />
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </S.StyledTableContainer>
    );
}
