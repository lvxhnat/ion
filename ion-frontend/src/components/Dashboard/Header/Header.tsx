import * as React from 'react';
import * as S from './style';

import ToggleThemeMode from 'components/ToggleThemeMode';
import Clock from 'components/Clock';
import MasterSearch from 'components/MasterSearch';

export default function Header() {
    return (
        <S.HeaderPanel>
            <S.LeftPanel>
                <MasterSearch />
            </S.LeftPanel>
            <S.RightPanel>
                <ToggleThemeMode />
                <Clock />
            </S.RightPanel>
        </S.HeaderPanel>
    );
}
