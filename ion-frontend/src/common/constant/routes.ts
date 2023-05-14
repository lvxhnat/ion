export const ROUTES = {
    PRIVATE: {},
    PUBLIC: {
        LANDING: '/',
        GEOPOLITICS: '/analysis/geopolitics',
        SECURITIES: '/analysis/securities',
        FUNCTION: '/function/function-list',
        PORTFOLIO: '/function/portfolio-administration',
        EXPLORE: '/function/etf-explore',
        HEALTHCHECK: '/function/health',
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
};

export const ASSET_TYPES = {
    FOREX: 'forex',
    EQUITY: 'equity',
    ETF: 'etf',
};
