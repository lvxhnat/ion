export type Time = IntervalAvailableObject[];
/**
 * Interface defining the available time intervals the data is available in, for example, 1D, 1W, 1M
 */
export interface IntervalAvailableObject {
    interval: number; // The number of days. 1 Week = 7 days | 1 Month = 28 Days | 1 Year = 365 Days
    callback: (symbol: string) => { X: string[]; Y: number[] }; // A callback function importing the data
}
