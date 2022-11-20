import * as React from 'react';
import * as S from './style';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import ToggleThemeMode from './ToggleThemeMode';
import Clock from './Clock';
import MasterSearch from './MasterSearch';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Header() {
    const navigate = useNavigate();

    return (
        <>
            <S.NavigationPanel>
                <S.IconButtonWrapper disableRipple onClick={() => navigate(-1)}>
                    <ChevronLeftIcon fontSize="small" />
                </S.IconButtonWrapper>
                <S.IconButtonWrapper disableRipple disabled>
                    <ChevronRightIcon fontSize="small" />
                </S.IconButtonWrapper>
            </S.NavigationPanel>
            <S.HeaderPanel>
                <S.LeftPanel>
                    <MasterSearch />
                </S.LeftPanel>
                <S.RightPanel>
                    <ToggleThemeMode />
                    <Clock />
                </S.RightPanel>
            </S.HeaderPanel>
        </>
    );
}
