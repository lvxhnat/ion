import * as React from 'react';
import { v4 as uuidv4 } from 'uuid';

import CssBaseline from '@mui/material/CssBaseline';
import Navigation from 'components/Navigation';

import { TickerSearch } from 'components/Search/Search';
import { ColorsEnum } from 'common/theme';
import { deleteTable, getTable, insertTable } from 'endpoints/clients/database/postgres/general';
import { PostgresTablesEnum } from 'endpoints/schema/database/postgres/props';
import { ASSET_TYPES, SOURCE_TYPES } from 'common/constant';
import { WatchlistTableEntry } from 'endpoints/schema/database/postgres/watchlist';
import MainDataTable from 'components/Tables/MainDataTable';

export default function Page() {
    const [selectedTickers, setSelectedTickers] = React.useState<WatchlistTableEntry[]>([]);

    React.useEffect(() => {
        getTable({ tableName: PostgresTablesEnum.WATCHLIST }).then(res => {
            setSelectedTickers(res.data);
        });
    }, []);

    const handleWatchlistAdd = (
        ticker: string,
        assetType: keyof typeof ASSET_TYPES,
        sourceType: keyof typeof SOURCE_TYPES
    ) => {
        const watchlistEntry = {
            uuid: uuidv4(),
            symbol: ticker,
            source: sourceType,
            date_added: new Date(),
            asset_type: assetType,
        };
        insertTable({
            tableName: PostgresTablesEnum.WATCHLIST,
            entry: watchlistEntry,
        });
        setSelectedTickers([...selectedTickers, watchlistEntry]);
    };

    const handleRowRemove = (id: string) => {
        if (id) {
            deleteTable({
                tableName: PostgresTablesEnum.WATCHLIST,
                id: id,
            });
            setSelectedTickers(selectedTickers.filter(entry => entry.uuid !== id));
        }
    };

    return (
        <>
            <CssBaseline />
            <Navigation />
            <div style={{ backgroundColor: ColorsEnum.warmgray1, padding: 5 }}>
                <TickerSearch setSelectedOption={handleWatchlistAdd} />
            </div>
            <MainDataTable
                id="watchlist"
                tableBody={selectedTickers}
                handleRowRemove={handleRowRemove}
            />
        </>
    );
}
