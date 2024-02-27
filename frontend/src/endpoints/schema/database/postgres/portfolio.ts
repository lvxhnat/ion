import { v4 as uuidv4 } from "uuid";

export interface PortfolioTableEntry {
  uuid: string;
  name: string;
  description: string;
  currency: string;
  creation_date: Date;
  last_updated: Date;
}

export interface PortfolioTransactionEntry {
  uuid: string;
  portfolio_id: string;
  asset_id: string;
  asset_type: string;
  exchange: string;
  quantity: number | null;
  price_purchased: number | null;
  broker: string;
  comission: number | null;
  currency: string;
  transaction_date: Date | null;
  time_zone: string | null;
}

/**
 * Initialise Portfolio Entry for insertion into portfolio_assets database
 * @param props
 * @returns
 */
export const initPortfolioTransactionEntry = (): PortfolioTransactionEntry => {
  return {
    uuid: uuidv4(),
    portfolio_id: "",
    asset_type: "",
    asset_id: "",
    exchange: "NYSE",
    quantity: 1,
    price_purchased: null,
    broker: "IBKR",
    comission: null,
    currency: "SGD",
    transaction_date: null,
    time_zone: null,
  } as PortfolioTransactionEntry;
};

export const checkValidPortfolioTransactionEntry = (
  entry: PortfolioTransactionEntry
): boolean => {
  return (
    entry.portfolio_id !== "" &&
    entry.asset_type !== "" &&
    entry.asset_id !== "" &&
    !!entry.price_purchased &&
    entry.comission !== null &&
    !!entry.transaction_date
  );
};
