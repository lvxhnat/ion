import * as React from 'react';
import * as S from './style';
import Drawline from './Drawline';
import IndicatorPopup from './IndicatorPopup';
import { Clearlines } from './Drawline/Drawline';
import IntervalSelection from './IntervalSelection';

export default function Header(props: { baseId: string; setData: Function }) {
    const availableIntervals = ['1D', '1W', '1M', '3M', '6M', '1Y', '3Y', '5Y'];
    return (
        <S.HeaderWrapper>
            <S.StartWrapper>
                <IntervalSelection intervals={availableIntervals} />
                <Drawline baseId={props.baseId} />
                <IndicatorPopup setData={props.setData} />
            </S.StartWrapper>
            <S.EndWrapper>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Clearlines baseId={props.baseId} />
                </div>
            </S.EndWrapper>
        </S.HeaderWrapper>
    );
}
