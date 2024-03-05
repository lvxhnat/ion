import { ENDPOINTS } from "endpoints/endpoints";
import { request } from "services/request";

export const getUserPortfolios = (userId: string) => {
  return request("ion-backend").get<GetUserPortfolios[]>(
    ENDPOINTS.PRIVATE.USER_PORTFOLIOS_ENDPOINT,
    { params: { user_id: userId } }
  );
};

export interface GetUserPortfolios {
  created_at: string
  description: string | null
  last_modified: string
  name: string
  portfolio_id: string
  user_id: string
}

export const createUserPortfolio = (userId: string, portfolioName: string) => {
  return request("ion-backend").post(
    ENDPOINTS.PRIVATE.USER_PORTFOLIOS_ENDPOINT,
    { user_id: userId, portfolio_name: portfolioName }
  );
};

export const deleteUserPortfolio = (portfolioId: string) => {
  return request("ion-backend").delete(
    ENDPOINTS.PRIVATE.USER_PORTFOLIOS_ENDPOINT,
    { data: { portfolio_id: portfolioId } }
  );
};
