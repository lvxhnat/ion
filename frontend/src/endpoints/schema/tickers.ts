import { SOURCE_TYPES } from "common/constant";

export interface OHLCHistoricalDTO {
  symbol: string;
  volume: number;
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

export interface EquityHistoricalDTO {
  data: OHLCHistoricalDTO[];
  source: keyof typeof SOURCE_TYPES;
}
export interface ForexHistoricalDTO extends OHLCHistoricalDTO {}
