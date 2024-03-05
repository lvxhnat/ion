export const ENDPOINTS = {
  AUTH: {
    TOKEN_CHECKER: "/auth",
  },
  BASEURLS: {
    DATA_INGESTION: process.env.REACT_APP_DATA_INGESTION_BASE_URL,
    ION_BACKEND: process.env.REACT_APP_ION_BACKEND_BASE_URL,
  },
  PRIVATE: {
    FRED_PARENT_ENDPOINT: "economic/fred/root",
    FRED_CHILD_ENDPOINT: "economic/fred/child",
    FRED_SERIES_ENDPOINT: "economic/fred/series",
    FRED_SEARCH_ENDPOINT: "economic/fred/search",

    USER_PORTFOLIOS_ENDPOINT: "portfolio/user-portfolios",
  },
  PUBLIC: {
    BASE: "/",
  },
  PUBLIC_REQUIRED_TOKEN: {},
};
