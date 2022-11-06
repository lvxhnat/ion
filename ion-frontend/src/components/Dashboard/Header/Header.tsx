import React from 'react'
import * as S from './style'

import ToggleThemeMode from 'components/ToggleThemeMode'
import Clock from 'components/Clock'

export default function Header() {
    return (
        <S.HeaderPanel>
            <ToggleThemeMode />
            <Clock />
        </S.HeaderPanel>
    )
}
