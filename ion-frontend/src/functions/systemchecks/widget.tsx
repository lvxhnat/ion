import * as React from 'react';

import SystemChecks from './systemchecks';
import WidgetContainer from 'components/WidgetContainer';

export default function Widget() {
    return (
        <WidgetContainer title="system_checks">
            <SystemChecks />
        </WidgetContainer>
    );
}
