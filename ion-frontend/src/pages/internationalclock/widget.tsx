import * as React from 'react';
import * as S from './style';

import InternationalClock from './internationalclock';
import WidgetContainer from 'components/WidgetContainer';

export default function Widget() {
    return (
        <WidgetContainer title="International Clock">
            <S.InternationalClockWrapper>
                <InternationalClock timeZoneName={'New York'} />
                <InternationalClock timeZoneName={'London'} />
                <InternationalClock timeZoneName={'Singapore'} />
                <InternationalClock timeZoneName={'Tokyo'} />
            </S.InternationalClockWrapper>
        </WidgetContainer>
    );
}
