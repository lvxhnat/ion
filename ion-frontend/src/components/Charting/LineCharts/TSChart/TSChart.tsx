import * as React from 'react';

import Header from './components/Header';
import BaseLineChart from '../BaseLineChart';
import { DefaultDataProps } from '../BaseLineChart/type';

export interface TSChartProps {
    defaultData: DefaultDataProps;
}

export default function TSChart({ defaultData }: TSChartProps): React.ReactElement {
    return (
        <>
            <Header />
            <BaseLineChart defaultData={defaultData} showGrid showAxis showNormalised showTooltip />
        </>
    );
}
