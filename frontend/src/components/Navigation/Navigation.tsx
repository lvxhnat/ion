import * as S from './style';
import * as React from 'react';

import Logo from '../../assets/logo.png';

import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'common/constant';
import AlternativeDataButton from './AlternativeDataButton';
import ProfileButton from './ProfileButton';
import AnalyticsButton from './AnalyticsButton';
import AboutButton from './AboutButton/AboutButton';
import { Grid } from '@mui/material';

export default function Navigation() {
    const navigate = useNavigate();

    return (
        <Grid container style={{ paddingTop: 10, paddingBottom: 10 }}>
            <Grid item xs={2}>
                <S.IconButtonWrapper disableRipple onClick={() => navigate(ROUTES.LANDING)}>
                    <img src={Logo} alt="home" style={{ width: 100 }} />
                </S.IconButtonWrapper>
            </Grid>
            <Grid item xs={8} style={{ display: 'flex', gap: 25 }} justifyContent="center">
                <AnalyticsButton />
                <AlternativeDataButton />
                <AboutButton />
            </Grid>
            <Grid item xs={2} display="flex" justifyContent="flex-end">
                <ProfileButton />
            </Grid>
        </Grid>
    );
}
