import * as React from 'react';
import * as S from './style';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { Modify } from 'common/types';
import { ColorsEnum } from 'common/theme';
import { OandaFXSocketConnection, unpackOandaFXStream } from './_clients/oanda';
import { ForexStreamType, ForexTableHeaderType, StyledTableCellProps } from './type';
import { forexStreamStore } from 'store/prices/prices';
import ForexTableCellGroup from './ForexTableCellGroup';
import ForexHistoricalCell from './ForexHistoricalCell/ForexHistoricalCell';
import { REQUEST_ENDPOINTS } from './configs';

export function StyledTableCell({ children, isHeader, width }: StyledTableCellProps) {
    return (
        <S.TableCellWrapper width={width}>
            <S.TableCellLabel variant="body2" align="center" isHeader={isHeader}>
                {children}
            </S.TableCellLabel>
        </S.TableCellWrapper>
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
        const oandaWS = new OandaFXSocketConnection({
            socketURL: REQUEST_ENDPOINTS.OANDA_WEBSOCKET.ENDPOINT,
            name: REQUEST_ENDPOINTS.OANDA_WEBSOCKET.NAME,
        });
        // Subscribe to the forex stream and store in global zustand state store
        oandaWS.listen((x: any) => setForexStream(unpackOandaFXStream(x)));
        return () => oandaWS.close();
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
                        <S.StyledTableRow key={`${forexPair}_row`}>
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
                        </S.StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
