import React from 'react';
import * as S from './style';

import CssBaseline from '@mui/material/CssBaseline';
import Header from 'components/Header';
import InternationalClock from './InternationalClock/InternationalClock';
import { Typography } from '@mui/material';

export default function Landing() {
    return (
        <>
            <CssBaseline />
            <Header />
            <S.InternationalClockWrapper>
                <InternationalClock timeZone={'America/New_York'} timeZoneName={'New York'} />
                <InternationalClock timeZone={'Europe/London'} timeZoneName={'London'} />
                <InternationalClock timeZone={'Asia/Singapore'} timeZoneName={'Singapore'} />
                <InternationalClock timeZone={'Asia/Tokyo'} timeZoneName={'Tokyo'} />
            </S.InternationalClockWrapper>
        </>
    );
}
