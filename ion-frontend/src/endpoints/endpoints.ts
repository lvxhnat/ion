export const ENDPOINTS = {
    BASEURLS: {
        DATA_INGESTION: process.env.REACT_APP_DATA_INGESTION_BASE_URL,
    },
    PRIVATE: {
        ETF_INFO: 'tickers/etf/info',
        FOREX_STREAMING_ENDPOINT: 'tickers/oanda/ws',
        FOREX_HISTORICAL_ENDPOINT: 'tickers/forex/historical',
        EQUITY_HISTORICAL_ENDPOINT: 'tickers/equity/historical',
        CURRENT_WEATHER_ENDPOINT: 'weather/weather/current',
        QUERY_POSTGRES_ENDPOINT: 'database/postgres/query',
        BASE_POSTGRES_ENDPOINT: 'database/postgres/', // Use for CRUD Operations. Officially 'postgres/{table_name}'
        AUTOCOMPLETE_TICKERS_ENDPOINT: 'database/autocomplete/query',

        SEARCH_FUNCTIONS: 'autocomplete/securityFunctions',
        ALL_FUNCTIONS: 'autocomplete/allFunctions',
        ETFS_CATEGORIES: 'autocomplete/etfAssetTypes',
        ETFS_INFOS: 'autocomplete/etfInfos',
    },
    PUBLIC: {
        BASE: '/',
    },
    PUBLIC_REQUIRED_TOKEN: {},
};

export const TEST_ENDPOINTS = {
    WEATHER_FUNCTIONS: {
        NAME: 'Weather',
        ENDPOINT: 'weather/health',
    },
} as const;
