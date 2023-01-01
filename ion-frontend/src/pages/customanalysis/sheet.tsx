import * as React from 'react';
import * as S from './style';

import SidePanel from './sheet/SidePanel';
import Drop from './sheet/Drop';

export default function Sheet() {
    React.useEffect(() => {
        var resize = document.querySelector('#resize');
        var left = document.querySelector<HTMLElement>('.left');
        var container = document.querySelector('.container');

        var moveX = left!.getBoundingClientRect().width + resize!.getBoundingClientRect().width / 2;

        var drag = false;
        resize!.addEventListener('mousedown', function (e: any) {
            drag = true;
            moveX = e.x;
        });

        container!.addEventListener('mousemove', function (e: any) {
            moveX = e.x;
            if (drag) left!.style.width = moveX - resize!.getBoundingClientRect().width / 2 + 'px';
        });

        container!.addEventListener('mouseup', function (e) {
            drag = false;
        });
    }, []);

    return (
        <S.Panel className="container">
            <SidePanel className="left" />
            <S.ResizingCursor id="resize" />
            <S.MainPanel>
                <Drop />
            </S.MainPanel>
        </S.Panel>
    );
}
