import * as React from 'react';

import { Grid } from '@mui/material';

import Legend from './components/Legend';
import Header from './components/Header';
import BaseLineChart from '../BaseLineChart';

export interface TSChartProps {
    dataX: Array<string>,
    dataY: Array<number>,
}

export default function TSChart({
    dataX,
    dataY,
}: TSChartProps) {

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
    )
}
