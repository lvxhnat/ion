import * as React from 'react';
import * as S from './style';
import Drawline from './Drawline';
import IndicatorPopup from './IndicatorPopup';
import { Clearlines } from './Drawline/Drawline';

export default function Header(props: { baseId: string }) {
    return (
        <S.HeaderWrapper>
            <S.StartWrapper>
                <Drawline baseId={props.baseId} />
                <IndicatorPopup />
            </S.StartWrapper>
            <S.EndWrapper>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Clearlines baseId={props.baseId} />
                </div>
            </S.EndWrapper>
        </S.HeaderWrapper>
    );
}
