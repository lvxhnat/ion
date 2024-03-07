import { ENDPOINTS } from "endpoints/endpoints";
import { request } from "services/request";

export const getUserPortfolio = (portfolioId: string) =>
  request("ion-backend").get<GetUserPortfolios>(
    ENDPOINTS.PRIVATE.PORTFOLIO_ENDPOINT,
    { params: { portfolio_id: portfolioId } }
  );

export interface GetUserPortfolios {
  created_at: string;
  last_modified: string;
  name: string;
  description: string | null;
  portfolio_id: string;
  user_id: string;
}

export const insertPortfolioTransaction = (
  portfolioId: string,
  entry: InsertPortfolioTransactionsParams
) =>
  request("ion-backend").post(
    `${ENDPOINTS.PRIVATE.BASE_PORTFOLIO_ENDPOINT}/${portfolioId}`,
    entry
  );

export interface BaseTransactionParams {
  transaction_id: string;
  portfolio_id: string;
  ticker: string;
  transaction_date: Date;
  fees: number;
  execution_price: number;
  units: number;
  type: "Buy" | "Sell";
  broker: string;
  remarks: string;
}
export interface InsertPortfolioTransactionsParams
  extends BaseTransactionParams {}

export const deletePortfolioTransaction = (transactionId: string) =>
  request("ion-backend").delete(
    `${ENDPOINTS.PRIVATE.BASE_PORTFOLIO_ENDPOINT}/${transactionId}`,
    { data: { transaction_id: transactionId } }
  );

export const getPortfolioTransactions = (portfolioId: string) =>
  request("ion-backend").get<BaseTransactionParams[]>(
    `${ENDPOINTS.PRIVATE.BASE_PORTFOLIO_ENDPOINT}/${portfolioId}`
  );
