import { dataIngestionRequest } from 'services/request';
import { ENDPOINTS } from 'common/constant/endpoints';
import { OandaFXSocketConnection } from 'data/clients/oanda';
import { ForexHistoricalDTO } from 'data/schema/tickers';

export const getHistoricalForex = (symbol: string, period: string, granularity: string) => {
    return dataIngestionRequest.post<ForexHistoricalDTO[]>(
        ENDPOINTS.PRIVATE.FOREX_HISTORICAL_ENDPOINT,
        {
            symbol: symbol,
            period: period,
            granularity: granularity,
        }
    );
};

export const getWebsocketForex = () => {
    return new OandaFXSocketConnection({
        socketURL: process.env.REACT_APP_WEBSOCKET_URL + ENDPOINTS.PRIVATE.FOREX_STREAMING_ENDPOINT,
        name: 'ForexWebSocket',
    });
};
