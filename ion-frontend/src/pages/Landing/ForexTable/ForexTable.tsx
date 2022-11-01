import * as React from 'react';
import * as S from './style';
import { ForexTableHeaderType, StyledTableCellProps } from './type';

import { ENDPOINTS } from 'common/constant/endpoints'
import { forexStreamStore } from 'store/prices/prices'
import ForexTableRow from './ForexTableRow'
import { OandaFXSocketConnection, unpackOandaFXStream } from './_helpers/oanda/oanda'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export function StyledTableCell({ children, isHeader, rest }: StyledTableCellProps) {
    return (
        <TableCell {...rest}>
            <S.TableCellLabel isHeader={isHeader}>
                {children}
            </S.TableCellLabel>
        </TableCell>
    )
}

export default function ForexTable() {

    const setForexStream = forexStreamStore((store: any) => store.setForexStream)
    const subscribedForexPairs = ["EUR_USD", "USD_SGD", "USD_INR", "USD_JPY"]

    React.useEffect(() => {
        const url = process.env.REACT_APP_WEBSOCKET_URL
        if (url) {
            const oandaWS = new OandaFXSocketConnection({
                socketURL: url + ENDPOINTS.PRIVATE.OANDA_FX_STREAMING_ENDPOINT,
                name: "OandaFXSocketConnection"
            })
            // Subscribe to the forex stream and store in global zustand state store
            oandaWS.listen((x: any) => setForexStream(unpackOandaFXStream(x)))
        }
    })

    const tableHeaders: Array<ForexTableHeaderType> = [
        { name: "instrument", index: "instrument" },
        { name: "closeoutBid", index: "closeoutBid" },
        { name: "closeoutAsk", index: "closeoutAsk" },
        { name: "spread", index: "spread" },
    ]

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 150 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        {tableHeaders.map((headerSpecification) => {
                            return (
                                <StyledTableCell isHeader key={headerSpecification.index}>
                                    {headerSpecification.name}
                                </StyledTableCell>
                            )
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {subscribedForexPairs.map((forexPair: string, index: number) => {
                        return (
                            <ForexTableRow key={`${forexPair}_${index}`} forexPair={forexPair} tableHeaders={tableHeaders} />
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

