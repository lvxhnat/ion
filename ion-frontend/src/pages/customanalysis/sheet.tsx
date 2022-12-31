import * as React from 'react';
import * as S from './style';

import SidePanel from './sheet/SidePanel';

export default function Sheet() {
    return (
        <S.Panel>
            <SidePanel />
            <S.MainPanel></S.MainPanel>
        </S.Panel>
    );
}
