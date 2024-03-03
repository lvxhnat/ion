import request from "services";
import { ENDPOINTS } from "endpoints/endpoints";

interface SearchResultsProps {
  query: string;
  limit: number;
}

export const getSearchResults = (props: SearchResultsProps) => {
  return request("data-backend").post(
    ENDPOINTS.PRIVATE.FRED_SEARCH_ENDPOINT,
    { query: props.query, limit: props.limit }
  );
};
