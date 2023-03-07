import * as React from 'react';

import TreasuryTable from '../treasurytable';
import WidgetContainer from 'components/WidgetContainer';
import { allowedTreasuryTables } from '../type';

import Select from 'components/Select';

export default function Widget() {
    const [table, setTable] = React.useState<typeof allowedTreasuryTables[number]>('us_bill_rates');

    return (
        <WidgetContainer
            title="us_treasury_rates"
            component={
                <Select
                    handleChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                        setTable(event.target.value as typeof allowedTreasuryTables[number])
                    }
                    options={allowedTreasuryTables.map((tableName: string) => {
                        return { value: tableName, name: tableName };
                    })}
                />
            }
        >
            <TreasuryTable table={table} />
        </WidgetContainer>
    );
}
