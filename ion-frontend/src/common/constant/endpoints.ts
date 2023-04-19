export const ENDPOINTS = {
    BASEURLS: {
        DATA_INGESTION: process.env.REACT_APP_DATA_INGESTION_BASE_URL,
    },
    PRIVATE: {
        FOREX_STREAMING_ENDPOINT: 'oanda/ws',
        FOREX_HISTORICAL_ENDPOINT: 'forex/historical',
        EQUITY_HISTORICAL_ENDPOINT: 'equity/historical',
        CURRENT_WEATHER_ENDPOINT: 'weather/current',

        ETF_INFO: 'etf/info',
        DB_QUERY: 'db/query',
        SEARCH_FUNCTIONS: 'autocomplete/securityFunctions',
        SEARCH_ASSETS: 'autocomplete/tradeableAssets',
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
    SEARCH_FUNCTIONS: {
        NAME: 'Autocomplete',
        ENDPOINT: 'autocomplete/health',
    },
    OANDA_FUNCTIONS: {
        NAME: 'Candles',
        ENDPOINT: 'candles/health',
    },
    DB_FUNCTIONS: {
        NAME: 'Database',
        ENDPOINT: 'db/health',
    },
    WEATHER_FUNCTIONS: {
        NAME: 'Weather',
        ENDPOINT: 'weather/health',
    },
} as const;
