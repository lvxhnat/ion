export const getChartviewBaseChartId = (ticker: string | undefined) => `${ticker}__tickerChart`;

export const getUniqueTickerId = (source: string, ticker: string) => `${ticker.toUpperCase()}:${source.slice(0, 3).toUpperCase()}`;