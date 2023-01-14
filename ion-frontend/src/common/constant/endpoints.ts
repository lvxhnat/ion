export const ENDPOINTS = {
    BASEURLS: {
        DATA_INGESTION: process.env.REACT_APP_DATA_INGESTION_BASE_URL,
    },
    PRIVATE: {
        INGEST_DATA: 'ingestion/upload',
        QUERY_USER_UPLOADS: 'ingestion/retrieveUserUploads',
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

export const TEST_ENDPOINTS = {
    SEARCH_FUNCTIONS: {
        NAME: 'Autocomplete',
        ENDPOINT: 'autocomplete/ping',
    },
    OANDA_FUNCTIONS: {
        NAME: 'Candles',
        ENDPOINT: 'candles/ping',
    },
    DB_FUNCTIONS: {
        NAME: 'Database',
        ENDPOINT: 'db/ping',
    },
    WEATHER_FUNCTIONS: {
        NAME: 'Weather',
        ENDPOINT: 'weather/ping',
    },
} as const;
