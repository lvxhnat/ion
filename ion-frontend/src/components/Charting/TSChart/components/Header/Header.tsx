import * as React from 'react';
import * as S from './style';

import Drawline from './Drawline';
import IndicatorPopup from './IndicatorPopup';
import { Clearlines } from './Drawline/Drawline';
import IntervalSelection from './IntervalSelection';
import ChartType from './ChartType';

export default function Header(props: { baseId: string; setData: Function }) {
    const availableIntervals = ['1D', '1W', '1M', '3M', '6M', '1Y', '3Y', '5Y'];
    return (
        <S.HeaderWrapper>
            <IntervalSelection intervals={availableIntervals} />
            <Drawline baseId={props.baseId} />
            <Clearlines baseId={props.baseId} />
            <IndicatorPopup setData={props.setData} />
            <ChartType />
        </S.HeaderWrapper>
    );
}
