import { ENDPOINTS } from 'endpoints/endpoints';
import { dataIngestionRequest } from 'services/request';
import { SOURCE_TYPES, ASSET_TYPES } from 'common/constant';

export const getPortfolioAssets = (props: { id: string }) => {
    return dataIngestionRequest.post(ENDPOINTS.PRIVATE.QUERY_PORTFOLIO_ENDPOINT, {
        id: props.id,
    });
};

export interface TickerMetadataDTO {
    asset_class: keyof typeof ASSET_TYPES;
    last_updated: string;
    name: string;
    source: keyof typeof SOURCE_TYPES;
    symbol: string;
}

export const getTickerMetadata = (props: {
    symbol: string;
    asset_class: keyof typeof ASSET_TYPES;
}) => {
    return dataIngestionRequest.post<TickerMetadataDTO>(ENDPOINTS.PRIVATE.QUERY_TICKER_ENDPOINT, {
        symbol: props.symbol,
        asset_class: props.asset_class,
    });
};

export const getWatchlistAssets = (props: { symbol: string }) => {
    return dataIngestionRequest.post(ENDPOINTS.PRIVATE.QUERY_WATCHLIST_ENDPOINT, {
        symbol: props.symbol,
    });
};
