import { dataIngestionRequest } from 'services/request';
import { REQUEST_ENDPOINTS } from 'data/endpoints/forex';
import { OandaFXSocketConnection } from 'data/clients/oanda';

export const getHistoricalForex = (symbol: string, period: string) => {
    return dataIngestionRequest.post(REQUEST_ENDPOINTS.OANDA_HISTORICAL.ENDPOINT, {
        symbol: symbol,
        period: period,
    });
};

export const getWebsocketForex = () => {
    return new OandaFXSocketConnection({
        socketURL: REQUEST_ENDPOINTS.OANDA_WEBSOCKET.ENDPOINT,
        name: REQUEST_ENDPOINTS.OANDA_WEBSOCKET.NAME,
    });
};
