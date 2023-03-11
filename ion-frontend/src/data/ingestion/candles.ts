import { ENDPOINTS } from 'common/constant/endpoints';
import { FinnhubCandlesSchema } from 'data/schema/candles';
import { dataIngestionRequest } from 'services/request';

export const getETFCandles = (ticker: string | string[]) => {
    return dataIngestionRequest.post<FinnhubCandlesSchema[]>(
        ENDPOINTS.PRIVATE.FINHUB_FX_HISTORICAL_ENDPOINT,
        {
            tickers: typeof ticker === 'string' ? [ticker] : ticker,
        }
    );
};
