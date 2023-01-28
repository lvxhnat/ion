import * as React from 'react';
import * as S from '../style';

import SidePanel from './SidePanel';
import MainPanel from './MainPanel';

export default function Sheet() {
    return (
        <S.Panel>
            <SidePanel />
            <MainPanel />
        </S.Panel>
    );
}
