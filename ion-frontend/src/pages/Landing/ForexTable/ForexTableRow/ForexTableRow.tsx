import * as React from 'react';
import * as S from './style';

import { forexStreamStore } from 'store/prices/prices';
import { FormattedForexDataType, ForexTableHeaderType } from '../type';
import { StyledTableCell } from '../ForexTable';
import { ColorsEnum } from 'common/theme';

export default function ForexTableRow(props: {
    tableHeaders: Array<ForexTableHeaderType>,
    forexPair: string
}) {

	const forexStream: FormattedForexDataType = forexStreamStore((store: any) => store.forexStream[props.forexPair]);

	return (
		<S.StyledTableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
			{props.tableHeaders.map((key: ForexTableHeaderType, index: number) => {

				const streamKey: keyof FormattedForexDataType = key.name;
				let data: string | number | null = null;
				let fontColor: string = ColorsEnum.beer;

				if (forexStream !== undefined) {
					data = (streamKey === 'instrument') ? props.forexPair : forexStream[streamKey];
					if (streamKey === 'closeoutBid' && forexStream.bid_change) {
						fontColor = forexStream.bid_change > 0 ? ColorsEnum.upHint : forexStream.bid_change < 0 ? ColorsEnum.downHint : fontColor;
					}
					if (streamKey === 'closeoutAsk' && forexStream.ask_change) {
						fontColor = forexStream.ask_change > 0 ? ColorsEnum.upHint : forexStream.ask_change < 0 ? ColorsEnum.downHint : fontColor;
					}
				}

				return (
					<StyledTableCell width={key.width + '%'} key={`${key.index}_${index}`}>
						<label style={{ color: fontColor }}>
							{data}
						</label>
					</StyledTableCell>
				);
			}
			)}
		</S.StyledTableRow>
	);

}
