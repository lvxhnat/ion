import { ENDPOINTS } from 'endpoints/endpoints';
import { dataIngestionRequest } from 'services/request';

export interface TickerMetadataDTO {
    asset_class: string;
    last_updated: string;
    name: string;
    source: string;
    symbol: string;
}

export const getTickerMetadata = (props: { symbol: string; asset_class: string }) => {
    return dataIngestionRequest.post<TickerMetadataDTO>(ENDPOINTS.PRIVATE.QUERY_TICKER_ENDPOINT, {
        symbol: props.symbol,
        asset_class: props.asset_class,
    });
};
