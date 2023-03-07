import { ENDPOINTS } from 'common/constant/endpoints';
import { ETFDataSchema } from 'data/schema/etf';
import { dataIngestionRequest } from 'services/request';

export const getETFInfo = (ticker: string) => {
    return dataIngestionRequest.post<ETFDataSchema>(ENDPOINTS.PRIVATE.ETF_INFO, { ticker: ticker });
};
