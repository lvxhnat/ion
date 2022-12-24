import * as React from 'react';
import * as S from './style';

import InternationalClock from './internationalclock';
import WidgetContainer from 'components/WidgetContainer';
import Grid from '@mui/material/Grid';

export default function Widget() {
    return (
        <WidgetContainer title="International Clock">
            <S.ICWidgetWrapper container spacing={2} columns={12}>
                <Grid item xs={6} md={6} lg={4} xl={3}>
                    <InternationalClock timeZoneName={'New York City'} />
                </Grid>
                <Grid item xs={6} md={6} lg={4} xl={3}>
                    <InternationalClock timeZoneName={'Singapore'} />
                </Grid>
                <S.ICObjectWrapper2 item lg={4} xl={3}>
                    <InternationalClock timeZoneName={'London'} />
                </S.ICObjectWrapper2>
                <S.ICObjectWrapper3 item xl={3}>
                    <InternationalClock timeZoneName={'Tokyo'} />
                </S.ICObjectWrapper3>
            </S.ICWidgetWrapper>
        </WidgetContainer>
    );
}
