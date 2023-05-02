import { ENDPOINTS } from 'common/constant/endpoints';
import { EquityHistoricalDTO } from 'endpoints/schema/tickers';
import { dataIngestionRequest } from 'services/request';

export const getCandles = (ticker: string | string[]) => {
    return dataIngestionRequest.post<EquityHistoricalDTO[]>(
        ENDPOINTS.PRIVATE.EQUITY_HISTORICAL_ENDPOINT,
        { ticker: ticker }
    );
};