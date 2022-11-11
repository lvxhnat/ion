import * as React from 'react';
import * as S from './style';
import { ForexTableHeaderType, StyledTableCellProps } from './type';

import { ENDPOINTS } from 'common/constant/endpoints';
import { forexStreamStore } from 'store/prices/prices';
import ForexTableRow from './ForexTableRow';
import { OandaFXSocketConnection, unpackOandaFXStream } from './_helpers/oanda/oanda';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { ColorsEnum } from 'common/theme';

export function StyledTableCell({ children, isHeader, width }: StyledTableCellProps) {
    return (
        <S.TableCellWrapper width={width}>
            <S.TableCellLabel align="center" isHeader={isHeader}>
                {children}
            </S.TableCellLabel>
        </S.TableCellWrapper>
    );
}

export default function ForexTable() {
    const setForexStream = forexStreamStore((store: any) => store.setForexStream);
    const subscribedForexPairs = ['EUR_USD', 'USD_SGD', 'USD_INR', 'USD_JPY'];

    React.useEffect(() => {
        const oandaWS = new OandaFXSocketConnection({
            socketURL:
                process.env.REACT_APP_WEBSOCKET_URL + ENDPOINTS.PRIVATE.OANDA_FX_STREAMING_ENDPOINT,
            name: 'OandaFXSocketConnection',
        });
        // Subscribe to the forex stream and store in global zustand state store
        oandaWS.listen((x: any) => setForexStream(unpackOandaFXStream(x)));
        return () => oandaWS.close();
    }, []);

    const tableHeaders: ForexTableHeaderType[] = [
        { name: 'instrument', index: 'instrument', width: 25 },
        { name: 'closeoutBid', index: 'closeoutBid', width: 25 },
        { name: 'closeoutAsk', index: 'closeoutAsk', width: 25 },
        { name: 'spread', index: 'spread', width: 25 },
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
                                    key={headerSpecification.index}
                                >
                                    {headerSpecification.name}
                                </StyledTableCell>
                            );
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {subscribedForexPairs.map((forexPair: string, index: number) => {
                        return (
                            <ForexTableRow
                                key={`${forexPair}_${index}`}
                                forexPair={forexPair}
                                tableHeaders={tableHeaders}
                            />
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
