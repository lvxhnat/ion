export const ROUTES = {
    PRIVATE: {},
    PUBLIC: {
        LANDING: '/',
        CHARTDASHBOARD: '/chartdashboard',
        GEOPOLITICS: '/geopolitics',
        SECURITIES: '/securities',
        FUNCTION: '/function-list',
        PORTFOLIO: '/portfolio-administration',
        EXPLORER: '/explorer',
        HEALTHCHECK: '/health',
        WATCHLIST: '/watchlist',
    },
    PUBLIC_REQUIRED_TOKEN: {},
};

export const ROUTE_METADATA = {
    LANDING: {
        DISPLAY_ROUTE: ROUTES.PUBLIC.LANDING,
        NAME: 'Landing Page',
        DESCRIPTION: 'Broad overview',
        TAG: [],
    },
    GEOPOLITICS: {
        DISPLAY_ROUTE: ROUTES.PUBLIC.GEOPOLITICS,
        NAME: 'Geopolitical Analysis',
        DESCRIPTION: 'Dasboard for analysing geopolitical risks.',
        TAGS: [],
    },
    SECURITIES: {
        DISPLAY_ROUTE: `${ROUTES.PUBLIC.SECURITIES}/[asset-type]/[ticker]`,
        NAME: 'Securities Analysis',
        DESCRIPTION: 'Chart and metadata of the security to be analysed.',
        TAG: [],
    },
    PORTFOLIO: {
        DISPLAY_ROUTE: ROUTES.PUBLIC.PORTFOLIO,
        NAME: 'Portfolio Administration',
        DESCRIPTION: 'Page to aggregate all your portfolio and analysis on them',
        TAG: [],
    },
    HEALTHCHECK: {
        DISPLAY_ROUTE: ROUTES.PUBLIC.HEALTHCHECK,
        NAME: 'Health Check',
        DESCRIPTION: 'Check the health of the current existing API endpoints and data ETLs',
        TAG: [],
    },
    EXPLORER: {
        DISPLAY_ROUTE: ROUTES.PUBLIC.EXPLORER,
        NAME: 'Explore Data',
        DESCRIPTION:
            'Explore the data available, including financial instruments and economic data.',
        TAG: [],
    },
    WATCHLIST: {
        DISPLAY_ROUTE: ROUTES.PUBLIC.WATCHLIST,
        NAME: 'Watchlist',
        DESCRIPTION: 'Watchlist ticker symbols and economic data',
        TAG: [],
    },
};

export const ASSET_TYPES = {
    FOREX: 'FOREX',
    EQUITY: 'STOCK',
    ETF: 'ETF',
    FRED: 'FRED',
};

export const SOURCE_TYPES = {
    FINNHUB: 'FINNHUB',
    FRED: 'FRED',
    ALPHAVANTAGE: 'ALPHAVANTAGE',
    EIA: 'EIA',
    USDA: 'USDA',
    OANDA: 'OANDA',
};
