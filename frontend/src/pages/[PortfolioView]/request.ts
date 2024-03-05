import { ENDPOINTS } from "endpoints/endpoints";
import { request } from "services/request";

export const getUserPortfolio = (portfolioId: string) => {
  return request("ion-backend").get<GetUserPortfolios>(
    ENDPOINTS.PRIVATE.PORTFOLIO_ENDPOINT,
    { params: { portfolio_id: portfolioId } }
  );
};

export interface GetUserPortfolios {
  created_at: string;
  description: string | null;
  last_modified: string;
  name: string;
  portfolio_id: string;
  user_id: string;
}
