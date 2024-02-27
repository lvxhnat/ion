import { SOURCE_TYPES } from "./routes";

export const getChartviewBaseChartId = (ticker: string | undefined) =>
  `${ticker}__tickerChart`;

export const getUniqueTickerId = (
  source: keyof typeof SOURCE_TYPES,
  ticker: string
) => `${ticker.toUpperCase()}:${source.slice(0, 4).toUpperCase()}`;
