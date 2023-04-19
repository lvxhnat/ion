export interface OHLCHistoricalDTO {
    symbol: string;
    volume: number;
    date: string;
    open: number;
    high: number;
    low: number;
    close: number;
}

export interface EquityHistoricalDTO extends OHLCHistoricalDTO {}
export interface ForexHistoricalDTO extends OHLCHistoricalDTO {}
