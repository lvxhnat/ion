import { dataIngestionRequest } from 'services/request';
import { ENDPOINTS } from 'common/constant/endpoints';
import { OandaFXSocketConnection } from 'data/clients/oanda';

export const getHistoricalForex = (symbol: string, period: string) => {
    return dataIngestionRequest.post(ENDPOINTS.PRIVATE.OANDA_FX_HISTORICAL_ENDPOINT, {
        symbol: symbol,
        period: period,
    });
};

export const getWebsocketForex = () => {
    return new OandaFXSocketConnection({
        socketURL: ENDPOINTS.PRIVATE.OANDA_FX_STREAMING_ENDPOINT,
        name: 'ForexWebSocket',
    });
};
