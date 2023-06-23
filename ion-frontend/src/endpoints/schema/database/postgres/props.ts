import { PortfolioAssetTableEntry, PortfolioTableEntry } from './portfolio';
import { WatchlistTableEntry } from './watchlist';

export enum PostgresTablesEnum {
    PORTFOLIO = 'portfolio',
    PORTFOLIO_ASSETS = 'portfolio_assets',
    WATCHLIST = 'watchlist',
}

export type PostgresTableSchemas =
    | PortfolioTableEntry
    | PortfolioAssetTableEntry
    | WatchlistTableEntry;
