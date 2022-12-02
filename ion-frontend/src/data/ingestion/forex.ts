import * as d3 from 'd3';
import { dataIngestionRequest } from 'services/request';
import { ENDPOINTS } from 'common/constant/endpoints';

import { REQUEST_ENDPOINTS } from 'data/endpoints/oanda';
import { OandaFXSocketConnection } from 'data/clients/oanda';

export const getHistoricalForex = (symbol: string, period: string) => {
    return dataIngestionRequest.post(ENDPOINTS.PRIVATE.OANDA_FX_HISTORICAL_ENDPOINT, {
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
