import * as S from './style';
import * as React from 'react';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import HomeIcon from '@mui/icons-material/Home';
import WifiOffIcon from '@mui/icons-material/WifiOff';
import WifiIcon from '@mui/icons-material/Wifi';

import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'common/constant';
import ToggleThemeMode from './ToggleThemeMode';
import { ColorsEnum } from 'common/theme';
import AlternativeDataButton from './AlternativeDataButton';
import ProfileButton from './ProfileButton';

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
                <CheckOnlineStatus />
            </S.LeftPanel>
            <S.CentrePanel>
                <AlternativeDataButton />
            </S.CentrePanel>
            <S.RightPanel>
                <ToggleThemeMode />
                <ProfileButton />
            </S.RightPanel>
        </S.NavigationPanel>
    );
}
