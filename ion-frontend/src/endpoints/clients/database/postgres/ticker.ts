import { ENDPOINTS } from 'endpoints/endpoints';
import { dataIngestionRequest } from 'services/request';

export const getTickerMetadata = (props: { symbol: string; asset_class: string }) => {
    return dataIngestionRequest.post(ENDPOINTS.PRIVATE.QUERY_TICKER_ENDPOINT, {
        symbol: props.symbol,
        asset_class: props.asset_class,
    });
};
