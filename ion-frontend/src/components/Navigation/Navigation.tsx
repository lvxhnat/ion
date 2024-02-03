import * as S from './style';
import * as React from 'react';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListAltIcon from '@mui/icons-material/ListAlt';
import HomeIcon from '@mui/icons-material/Home';
import WifiOffIcon from '@mui/icons-material/WifiOff';
import WifiIcon from '@mui/icons-material/Wifi';
import Typography from '@mui/material/Typography';

import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'common/constant';
import ToggleThemeMode from './ToggleThemeMode';
import Clock from './Clock';
import { ColorsEnum } from 'common/theme';

const CheckOnlineStatus = () => {
    const [connStatus, setConnStatus] = React.useState<boolean>(false);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setConnStatus(window.navigator.onLine);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div
            style={{
                color: connStatus ? ColorsEnum.upHint : ColorsEnum.downHint,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 5,
            }}
        >
            {connStatus ? <WifiIcon fontSize="small" /> : <WifiOffIcon fontSize="small" />}
        </div>
    );
};

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
                <S.IconButtonWrapper disableRipple onClick={() => navigate(ROUTES.LANDING)}>
                    <HomeIcon fontSize="small" />
                </S.IconButtonWrapper>
                <S.IconButtonWrapper disableRipple onClick={() => navigate(ROUTES.FUNCTION)}>
                    <ListAltIcon fontSize="small" />
                </S.IconButtonWrapper>
                <CheckOnlineStatus />
            </S.LeftPanel>
            <S.RightPanel>
                <ToggleThemeMode />
                <Clock />
            </S.RightPanel>
        </S.NavigationPanel>
    );
}
