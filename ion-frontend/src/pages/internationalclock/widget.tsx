import * as React from 'react';
import * as S from './style';

import InternationalClock from './internationalclock';

export default function Widget() {
    return (
        <S.InternationalClockWrapper>
            <InternationalClock timeZoneName={'New York'} />
            <InternationalClock timeZoneName={'London'} />
            <InternationalClock timeZoneName={'Singapore'} />
            <InternationalClock timeZoneName={'Tokyo'} />
        </S.InternationalClockWrapper>
    );
}
