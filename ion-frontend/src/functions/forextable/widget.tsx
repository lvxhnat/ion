import * as React from 'react';

import ForexTable from './forextable';
import WidgetContainer from 'components/WidgetContainer';

export default function Widget() {
    return (
        <WidgetContainer title="Forex Summary">
            <ForexTable />
        </WidgetContainer>
    );
}
