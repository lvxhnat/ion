import { ENDPOINTS } from 'endpoints/endpoints';
import { ETFDataSchema } from 'endpoints/schema/etf';
import { request } from 'services/request';

export const getETFInfo = (ticker: string) => {
    return request('data-ingestion').post<ETFDataSchema>(ENDPOINTS.PRIVATE.ETF_INFO, {
        ticker: ticker,
    });
};
