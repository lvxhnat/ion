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
  entry: InsertPortfolioTickersParams
) =>
  request("ion-backend").post(
    `${ENDPOINTS.PRIVATE.BASE_PORTFOLIO_ENDPOINT}/${portfolioId}`,
    entry
  );

export interface BaseTickerParams {
  transaction_id: string;
  portfolio_id: string;
  ticker: string;
  units: number;
  type: "Buy" | "Sell";
  remarks: string;
}
export interface InsertPortfolioTickersParams extends BaseTickerParams {}

export const deletePortfolioTransaction = (transactionId: string) =>
  request("ion-backend").delete(
    `${ENDPOINTS.PRIVATE.BASE_PORTFOLIO_ENDPOINT}/${transactionId}`,
    { data: { transaction_id: transactionId } }
  );

export const getPortfolioTickers = (portfolioId: string) =>
  request("ion-backend").get<BaseTickerParams[]>(
    `${ENDPOINTS.PRIVATE.BASE_PORTFOLIO_ENDPOINT}/${portfolioId}`
  );
