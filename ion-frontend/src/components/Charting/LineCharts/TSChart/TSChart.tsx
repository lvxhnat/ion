import * as React from 'react';

import Header from './components/Header';
import BaseLineChart from '../BaseLineChart';

export interface TSChartProps {
    dataX: string[];
    dataY: number[];
}

export default function TSChart({ dataX, dataY }: TSChartProps): React.ReactElement {
    return (
        <>
            <Header />
            <BaseLineChart
                dataX={dataX}
                dataY={dataY}
                showGrid
                showAxis
                showArea
                showNormalised
                showTooltip
            />
        </>
    );
}
