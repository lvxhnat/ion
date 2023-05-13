import * as React from 'react';

import LivePlayer from '../liveplayer';
import WidgetContainer from 'components/WidgetContainer';

export default function Widget() {
    return (
        <WidgetContainer title="Live News Player">
            <LivePlayer />
        </WidgetContainer>
    );
}
