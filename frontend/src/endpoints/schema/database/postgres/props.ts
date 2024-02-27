import { PortfolioTransactionEntry, PortfolioTableEntry } from "./portfolio";
import { WatchlistTableEntry } from "./watchlist";

export enum PostgresTablesEnum {
  PORTFOLIO = "portfolio",
  PORTFOLIO_TRANSACTIONS = "portfolio_transactions",
  WATCHLIST = "watchlist",
}

export type PostgresTableSchemas =
  | PortfolioTableEntry
  | PortfolioTransactionEntry
  | WatchlistTableEntry;
