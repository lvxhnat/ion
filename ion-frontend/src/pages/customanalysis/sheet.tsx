import * as React from 'react';
import * as S from './style';

import SidePanel from './sheet/SidePanel';
import MainPanel from './sheet/MainPanel';

export default function Sheet() {
    return (
        <S.Panel>
            <SidePanel />
            <MainPanel />
        </S.Panel>
    );
}
