import { ENDPOINTS } from "endpoints/endpoints";
import { request } from "services/request";

export const getUserPortfolios = (userId: string) => {
    return request("ion-backend").get(
        ENDPOINTS.PRIVATE.USER_PORTFOLIOS_ENDPOINT,
        { params: { user_id: userId } }
    );
};

export const createUserPortfolio = (userId: string, portfolioName: string) => {
    return request("ion-backend").post(
        ENDPOINTS.PRIVATE.USER_PORTFOLIOS_ENDPOINT,
        { params: { user_id: userId, portfolio_name: portfolioName } }
    );
};
