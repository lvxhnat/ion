import { ENDPOINTS } from 'common/constant/endpoints';
import { ETFDataSchema } from 'endpoints/schema/etf';
import { dataIngestionRequest } from 'services/request';

export const getETFInfo = (ticker: string) => {
    return dataIngestionRequest.post<ETFDataSchema>(ENDPOINTS.PRIVATE.ETF_INFO, { ticker: ticker });
};
