import { ENDPOINTS } from 'common/constant/endpoints';

export const REQUEST_ENDPOINTS = {
    OANDA_WEBSOCKET: {
        NAME: 'OandaFXSocketConnection',
        ENDPOINT:
            process.env.REACT_APP_WEBSOCKET_URL + ENDPOINTS.PRIVATE.OANDA_FX_STREAMING_ENDPOINT,
    },
    OANDA_HISTORICAL: {
        NAME: 'OandaFXHistorical',
        ENDPOINT: ENDPOINTS.PRIVATE.OANDA_FX_HISTORICAL_ENDPOINT,
    },
};
