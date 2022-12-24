export const ENDPOINTS = {
    BASEURLS: {
        DATA_INGESTION: process.env.REACT_APP_DATA_INGESTION_BASE_URL,
    },
    PRIVATE: {
        SEARCH_FUNCTIONS: 'autocomplete/securityFunctions',
        OANDA_FX_STREAMING_ENDPOINT: 'oanda/ws',
        OANDA_FX_HISTORICAL_ENDPOINT: 'candles/oanda/candlesHistorical',
        DB_QUERY: 'db/query',
        CURRENT_WEATHER_ENDPOINT: 'weather/currentWeather',
    },
    PUBLIC: {
        BASE: '/',
    },
    PUBLIC_REQUIRED_TOKEN: {},
};
