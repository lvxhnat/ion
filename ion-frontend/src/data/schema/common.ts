export interface OHLCDataSchema {
    date: Date;
    open: number;
    high: number;
    low: number;
    close: number;
    vol?: number;
}
