import { dataIngestionRequest } from 'services/request';
import { ENDPOINTS } from 'common/constant/endpoints';
import { ETFInfoDTO, ETFInfoRequestProps } from 'endpoints/schema/autocomplete';

export const getETFAssetTypes = () => {
    return dataIngestionRequest.get<string[]>(ENDPOINTS.PRIVATE.ETFS_CATEGORIES);
};

export const getETFInfos = (actions: ETFInfoRequestProps) => {
    return dataIngestionRequest.post<ETFInfoDTO[]>(ENDPOINTS.PRIVATE.ETFS_INFOS, {
        request: actions,
    });
};
