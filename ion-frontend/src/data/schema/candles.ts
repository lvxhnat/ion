export type FinnhubCandlesSchema = FinnhubCandlesEntrySchema[];

export interface FinnhubCandlesEntrySchema {
    open: number;
    high: number;
    low: number;
    close: number;
    date: number;
    volume: number;
    symbol: string;
}
