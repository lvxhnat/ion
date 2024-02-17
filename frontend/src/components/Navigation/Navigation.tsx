import * as S from './style';
import * as React from 'react';

import HomeIcon from '@mui/icons-material/Home';

import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'common/constant';
import AlternativeDataButton from './AlternativeDataButton';
import ProfileButton from './ProfileButton';
import AnalyticsButton from './AnalyticsButton';

export default function Navigation() {
    const navigate = useNavigate();

    return (
        <S.NavigationPanel>
            <S.LeftPanel>
                <S.IconButtonWrapper disableRipple onClick={() => navigate(ROUTES.LANDING)}>
                    <HomeIcon fontSize="small" />
                </S.IconButtonWrapper>
            </S.LeftPanel>
            <S.CentrePanel>
                <AnalyticsButton />
                <AlternativeDataButton />
            </S.CentrePanel>
            <S.RightPanel>
                <ProfileButton />
            </S.RightPanel>
        </S.NavigationPanel>
    );
}
