import * as S from './style';
import * as React from 'react';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListAltIcon from '@mui/icons-material/ListAlt';
import HomeIcon from '@mui/icons-material/Home';

import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'common/constant';
import ToggleThemeMode from './ToggleThemeMode';
import Clock from './Clock';

export default function Navigation() {
    const navigate = useNavigate();

    return (
        <S.NavigationPanel>
            <S.LeftPanel>
                <S.IconButtonWrapper disableRipple onClick={() => navigate(-1)}>
                    <ChevronLeftIcon fontSize="small" />
                </S.IconButtonWrapper>
                <S.IconButtonWrapper disableRipple disabled>
                    <ChevronRightIcon fontSize="small" />
                </S.IconButtonWrapper>
                <S.IconButtonWrapper disableRipple onClick={() => navigate(ROUTES.PUBLIC.LANDING)}>
                    <HomeIcon fontSize="small" />
                </S.IconButtonWrapper>
                <S.IconButtonWrapper disableRipple onClick={() => navigate(ROUTES.PUBLIC.FUNCTION)}>
                    <ListAltIcon fontSize="small" />
                </S.IconButtonWrapper>
            </S.LeftPanel>
            <S.RightPanel>
                <ToggleThemeMode />
                <Clock />
            </S.RightPanel>
        </S.NavigationPanel>
    );
}
