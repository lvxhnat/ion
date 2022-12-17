import * as React from 'react';
import { forexStreamStore } from 'store/prices/prices';
import { FormattedForexStreamType, ForexTableHeaderType } from '../type';
import { ColorsEnum } from 'common/theme';
import { StyledTableCell } from 'components/Tables/BaseTable/StyledTableCell';

export default function ForexTableCellGroup(props: {
    tableHeaders: ForexTableHeaderType[];
    forexPair: string;
}) {
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
