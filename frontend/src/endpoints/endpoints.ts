export const ENDPOINTS = {
    AUTH: {
        TOKEN_CHECKER: '/auth',
    },
    BASEURLS: {
        DATA_INGESTION: process.env.REACT_APP_DATA_INGESTION_BASE_URL,
        ION_BACKEND: process.env.REACT_APP_ION_BACKEND_BASE_URL,
    },
    PRIVATE: {
        ETF_INFO: 'tickers/etf/info',
        FOREX_STREAMING_ENDPOINT: 'oanda/ws',
        FOREX_HISTORICAL_ENDPOINT: 'tickers/forex/historical',
        EQUITY_HISTORICAL_ENDPOINT: 'tickers/equity/historical',
        CURRENT_WEATHER_ENDPOINT: 'weather/weather/current',
        QUERY_POSTGRES_ENDPOINT: 'database/postgres/query',
        BASE_POSTGRES_ENDPOINT: 'database/postgres/', // Use for CRUD Operations. Officially 'postgres/{table_name}'
        AUTOCOMPLETE_TICKERS_ENDPOINT: 'database/autocomplete/query',

        FRED_PARENT_NODES_ENDPOINT: 'government/fred/root',
        FRED_CHILD_NODES_ENDPOINT: 'government/fred/child',
        FRED_SERIES_NODES_ENDPOINT: 'government/fred/series',

        QUERY_PORTFOLIO_ENDPOINT: 'database/postgres/query/portfolio',
        QUERY_TICKER_ENDPOINT: 'database/postgres/query/ticker',
        QUERY_WATCHLIST_ENDPOINT: 'database/postgres/query/watchlist',

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
