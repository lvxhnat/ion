import { PortfolioAssetTableEntry, PortfolioTableEntry } from './portfolio/props';

export enum PostgresTablesEnum {
    PORTFOLIO = 'portfolio',
    PORTFOLIO_ASSETS = 'portfolio_assets',
}

export type PostgresTableSchemas = PortfolioTableEntry | PortfolioAssetTableEntry;
