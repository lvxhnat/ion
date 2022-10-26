/**
 * Streams Forex Data into table rows using a plugin architecture
 */

import * as React from 'react'
import * as S from './style'

import { forexStreamStore } from 'store/prices/prices'
import { ForexTableDataType, ForexTableHeaderType } from '../type'
import { StyledTableCell } from '../ForexTable'

export default function ForexTableRow(props: {
    tableHeaders: Array<ForexTableHeaderType>,
    forexPair: string
}) {

    const forexStream: ForexTableDataType = forexStreamStore((store: any) => store.forexStream[props.forexPair])

    return (
        <S.StyledTableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            {props.tableHeaders.map((key: ForexTableHeaderType, index: number) => {

                const streamKey: keyof ForexTableDataType = key.name;
                let data: string | number | null = null;

                if (forexStream !== undefined) {
                    data = (streamKey === "instrument") ? props.forexPair : forexStream[streamKey]
                }

                return (
                    <StyledTableCell key={`${key}_${index}`} align="right">
                        {data}
                    </StyledTableCell>
                )
            }
            )}
        </S.StyledTableRow>
    )
}
