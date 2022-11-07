import * as React from 'react';
import * as S from './style';

import { Grid } from '@mui/material';

import Legend from './components/Legend';
import { IndicatorPopup, Drawline } from './components/Header';
import BaseLineChart from '../BaseLineChart';

export interface TSChartProps {
    dataX: Array<string>,
    dataY: Array<number>,
}

export default function TSChart({
	dataX,
	dataY,
}: TSChartProps) {

	const [legend, setLegend] = React.useState([{
		name: 'test', color: 'white', f: () => console.log('s'),
		indicators: [{
			name: 'sma', color: 'yellow', f: () => console.log('removed')
		}]
	}]);

	return (
		<Grid container spacing={2}>
			<Grid item xs={3}>
				<Legend data={legend} />
			</Grid>
			<Grid item xs={9}>
				<S.HeaderWrapper>
					<Drawline />
					<IndicatorPopup />
				</S.HeaderWrapper>
				<BaseLineChart
					dataX={dataX}
					dataY={dataY}
					showGrid
					showAxis
					showArea
					showNormalised
					showTooltip
				/>
			</Grid>
		</Grid>
	);
}
