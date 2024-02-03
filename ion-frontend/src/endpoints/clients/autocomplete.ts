import { request } from 'services/request';
import { ENDPOINTS } from 'endpoints/endpoints';
import { ETFInfoDTO, ETFInfoRequestProps } from 'endpoints/schema/autocomplete';

export interface TickerSearchDTO {
    asset_class: string;
    last_updated: string;
    name: string;
    source: string;
    symbol: string;
}

export const getTickerSearchAutocomplete = (query: string) => {
    return request("data-ingestion").post<TickerSearchDTO[]>(
        ENDPOINTS.PRIVATE.AUTOCOMPLETE_TICKERS_ENDPOINT,
        {
            table: 'asset_metadata',
            query: query,
        }
    );
};

export const getETFAssetTypes = () => {
    return request("data-ingestion").get<string[]>(ENDPOINTS.PRIVATE.ETFS_CATEGORIES);
};

export const getETFInfos = (actions: ETFInfoRequestProps) => {
    return request("data-ingestion").post<ETFInfoDTO[]>(ENDPOINTS.PRIVATE.ETFS_INFOS, {
        request: actions,
    });
};
