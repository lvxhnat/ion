import * as React from 'react';
import * as S from './style';

import GestureIcon from '@mui/icons-material/Gesture';
import QueryStatsIcon from '@mui/icons-material/QueryStats';

import { addDraw, removeDraw } from 'components/Charting/BaseLineChart/plugins';

export default function Drawline() {

	const [isDraw, setIsDraw] = React.useState<boolean>(false);

	function handleClick() {
		if (!isDraw) {
			addDraw();
		} else {
			removeDraw();
		}
		setIsDraw(!isDraw);
	}

	return (
		<S.ButtonWrapper
			onClick={handleClick}
			startIcon={isDraw ? <GestureIcon fontSize="small" /> : <QueryStatsIcon fontSize="small" />}
		>
			{isDraw ? 'Draw Mode' : 'Tooltip Mode'}
		</S.ButtonWrapper>
	);
}
