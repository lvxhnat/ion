import { dataIngestionRequest } from 'services/request';
import { ENDPOINTS } from 'common/constant/endpoints';
import { ETFInfoDTO, ETFInfoRequestProps } from 'data/schema/autocomplete';

export const getTradeableAssets = (query_tick?: string, query_type?: string) => {
    const kwargs = query_tick ? { query_tick: query_tick } : { query_type: query_type };
    return dataIngestionRequest.post(ENDPOINTS.PRIVATE.SEARCH_ASSETS, kwargs);
};

export const getAllFunctions = () => {
    return dataIngestionRequest.get(ENDPOINTS.PRIVATE.ALL_FUNCTIONS);
};

export const getETFAssetTypes = () => {
    return dataIngestionRequest.get<string[]>(ENDPOINTS.PRIVATE.ETFS_CATEGORIES);
};

export const getETFInfos = (actions: ETFInfoRequestProps) => {
    return dataIngestionRequest.post<ETFInfoDTO[]>(ENDPOINTS.PRIVATE.ETFS_INFOS, {
        request: actions,
    });
};
