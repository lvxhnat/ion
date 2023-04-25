import { PortfolioTableEntry } from './portfolio/props';

export enum PostgresTablesEnum {
    PORTFOLIO = 'portfolio',
}

interface BasePostgresTableParams {
    tableName: string;
}

export interface InsertTableParams extends BasePostgresTableParams {
    entry: PortfolioTableEntry;
}

export interface DeleteTableParams extends BasePostgresTableParams {
    id: string;
}

export interface UpdateTableParams extends BasePostgresTableParams {
    id: string;
    entry: PortfolioTableEntry;
}
