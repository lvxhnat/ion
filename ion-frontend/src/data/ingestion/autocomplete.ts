import { dataIngestionRequest } from 'services/request';
import { ENDPOINTS } from 'common/constant/endpoints';

export const getTradeableAssets = (query_tick?: string, query_type?: string) => {
    const kwargs = query_tick ? { query_tick: query_tick } : { query_type: query_type };
    return dataIngestionRequest.post(ENDPOINTS.PRIVATE.SEARCH_ASSETS, kwargs);
};

export const getAllFunctions = () => {
    return dataIngestionRequest.get(ENDPOINTS.PRIVATE.SEARCH_FUNCTIONS);
};

export const getETFAssetTypes = () => {
    return dataIngestionRequest.get(ENDPOINTS.PRIVATE.ETFS_CATEGORIES);
};
