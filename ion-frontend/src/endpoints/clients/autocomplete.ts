import { dataIngestionRequest } from 'services/request';
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
    return dataIngestionRequest.post<TickerSearchDTO[]>(
        ENDPOINTS.PRIVATE.AUTOCOMPLETE_TICKERS_ENDPOINT,
        {
            table: 'asset_metadata',
            query: query,
        }
    );
};

export const getETFAssetTypes = () => {
    return dataIngestionRequest.get<string[]>(ENDPOINTS.PRIVATE.ETFS_CATEGORIES);
};

export const getETFInfos = (actions: ETFInfoRequestProps) => {
    return dataIngestionRequest.post<ETFInfoDTO[]>(ENDPOINTS.PRIVATE.ETFS_INFOS, {
        request: actions,
    });
};
