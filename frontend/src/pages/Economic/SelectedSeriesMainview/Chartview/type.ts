import { ASSET_TYPES } from "common/constant";
import { FredSeriesEntry } from "pages/Economic/requests";

export interface ChartviewProps {
  ticker: string;
  assetType?: keyof typeof ASSET_TYPES;
  seriesSelected: FredSeriesEntry | undefined;
}
