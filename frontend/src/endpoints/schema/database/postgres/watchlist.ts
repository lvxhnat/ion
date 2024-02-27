import { v4 as uuidv4 } from "uuid";
import { ASSET_TYPES, SOURCE_TYPES } from "common/constant";

export interface WatchlistTableEntry {
  uuid: string;
  symbol: string;
  source: keyof typeof SOURCE_TYPES;
  asset_type: keyof typeof ASSET_TYPES;
  date_added: Date;
}

export const initWatchlistTableEntry = (props: {
  ticker: string;
  portfolio_id: string;
  asset_type: string;
}): WatchlistTableEntry => {
  return {
    uuid: uuidv4(),
    symbol: props.ticker,
    source: "ALPHAVANTAGE" as keyof typeof SOURCE_TYPES,
    asset_type: "STOCK" as keyof typeof ASSET_TYPES,
    date_added: new Date(),
  };
};
