import WidgetContainer from 'components/WidgetContainer';
import React from 'react';
import TreasuryTable from './treasurytable';

export default function Widget(props: { tableType: string }) {
    return (
        <WidgetContainer title="us_treasury_rates">
            <TreasuryTable table={props.tableType} />
        </WidgetContainer>
    );
}
