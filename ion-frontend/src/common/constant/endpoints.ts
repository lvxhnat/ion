export const ENDPOINTS = {
    BASEURLS: {
        ION_INGESTION: process.env.REACT_APP_ION_INGESTION_BASE_URL,
        DATA_INGESTION: process.env.REACT_APP_DATA_INGESTION_BASE_URL,
    },
    PRIVATE: {
        SEARCH_FUNCTIONS: 'autocomplete/securityFunctions',
        OANDA_FX_STREAMING_ENDPOINT: 'oanda/ws',
        OANDA_FX_HISTORICAL_ENDPOINT: 'candles/oanda/candlesHistorical',
    },
    PUBLIC: {
        BASE: '/',
    },
    PUBLIC_REQUIRED_TOKEN: {},
};
