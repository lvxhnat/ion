import { ENDPOINTS } from 'endpoints/endpoints';
import { dataIngestionRequest } from 'services/request';

export const getPortfolioAssets = (props: { id: string }) => {
    return dataIngestionRequest.post(ENDPOINTS.PRIVATE.QUERY_PORTFOLIO_ENDPOINT, {
        id: props.id,
    });
};
