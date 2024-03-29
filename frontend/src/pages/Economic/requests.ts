import { ENDPOINTS } from "endpoints/endpoints";
import { request } from "services/request";

export interface FredCategoryEntry {
  id: number;
  parent_id: number;
  name: string;
  last_updated: string;
}

export interface FredSeriesEntry {
  id: string;
  realtime_start: string;
  realtime_end: string;
  title: string;
  observation_start: string;
  observation_end: string;
  frequency: string;
  frequency_short: string;
  units: string;
  units_short: string;
  seasonal_adjustment: string;
  seasonal_adjustment_short: string;
  last_updated: string;
  popularity: number;
  group_popularity: number;
  notes: string;
}

export interface FredSeriesDataEntry {
  realtime_start: string;
  realtime_end: string;
  date: string;
  value: number;
}

export type FredParentNodeDTO = {
  parent_node: FredCategoryEntry;
  child_node: FredCategoryEntry[];
}[];

export const getFredParentNodes = () => {
  return request("data-backend").get<FredParentNodeDTO>(
    ENDPOINTS.PRIVATE.FRED_PARENT_ENDPOINT
  );
};

export interface FredChildNodeDTO {
  type: "series" | "category";
  data: FredCategoryEntry[] | FredSeriesEntry[];
}

export const getFredChildNodes = (category_id: number) => {
  return request("data-backend").post<FredChildNodeDTO>(
    ENDPOINTS.PRIVATE.FRED_CHILD_ENDPOINT,
    {
      category_id: category_id,
    }
  );
};

export const getFredSeries = (series_id: string) => {
  return request("data-backend").post<FredSeriesDataEntry[]>(
    ENDPOINTS.PRIVATE.FRED_SERIES_ENDPOINT,
    {
      series_id: series_id,
    }
  );
};

export interface EconomicCalendarEntry {
  created_at: string
  date: string
  entry_id: string
  fred_release_id: string
  last_modified: string
  name: string
}

export const getEconomicCalendar = () => {
  return request("ion-backend").get<EconomicCalendarEntry[]>(
    ENDPOINTS.PRIVATE.ECONOMIC_CALENDAR_ENDPOINT,
  );
};
