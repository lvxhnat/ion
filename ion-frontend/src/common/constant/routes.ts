export const ROUTES = {
    PRIVATE: {},
    PUBLIC: {
        LANDING: '/',
        ANALYSIS: '/securities/analysis',
        FUNCTION: '/function/function-list',
        PORTFOLIO: '/function/portfolio-administration',
        EXPLORE: '/function/etf-explore',
        HEALTHCHECK: '/function/health',
    },
    PUBLIC_REQUIRED_TOKEN: {},
};

export const ROUTE_METADATA = {
    LANDING: {
        DISPLAY_ROUTE: '/',
        NAME: 'Landing Page',
        DESCRIPTION: 'Broad overview',
        TAG: [],
    },
    ANALYSIS: {
        DISPLAY_ROUTE: '/securities/analysis/[asset-type]/[ticker]',
        NAME: 'Securities Analysis',
        DESCRIPTION: 'Chart and metadata of the security to be analysed.',
        TAG: [],
    },
    PORTFOLIO: {
        DISPLAY_ROUTE: '/function/portfolio-administration',
        NAME: 'Portfolio Administration',
        DESCRIPTION: 'Page to aggregate all your portfolio and analysis on them',
        TAG: [],
    },
    HEALTHCHECK: {
        DISPLAY_ROUTE: '/function/health',
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
