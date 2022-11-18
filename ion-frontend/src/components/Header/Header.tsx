import * as React from 'react';
import * as S from './style';

import ToggleThemeMode from './ToggleThemeMode';
import Clock from './Clock';
import MasterSearch from './MasterSearch';

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
