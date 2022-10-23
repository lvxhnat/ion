import React from 'react'
import * as S from './style'

import ToggleThemeMode from 'components/ToggleThemeMode'

export default function Header() {
    return (
        <div>
            <S.HeaderRightPanel>
                <ToggleThemeMode />
            </S.HeaderRightPanel>
        </div>
    )
}
