import * as React from 'react';
import * as S from './style';
import Drawline from './Drawline';
import IndicatorPopup from './IndicatorPopup';
import { Clearlines } from './Drawline/Drawline';

export default function Header() {
    return (
        <S.HeaderWrapper>
            <S.StartWrapper>
                <Drawline />
                <IndicatorPopup />
            </S.StartWrapper>
            <S.EndWrapper>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Clearlines />
                </div>
            </S.EndWrapper>
        </S.HeaderWrapper>
    );
}
