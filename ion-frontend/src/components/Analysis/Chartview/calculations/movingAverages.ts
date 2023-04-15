/**
 * Finds simple moving average, where the last element of the array is the most recent value.
 * @param arr The array containing the prices/time series
 * @param window The window we want to calculate simple moving average for
 */
export function calcSimpleMovingAverage(arr: number[], window: number = 9) {
    let accumulator = 0;
    return new Array(arr.length).fill(null).map((u, i) => {
        if (i == window - 1) {
            accumulator = (accumulator + arr[i]) / window;
            return accumulator;
        } else if (i > window - 1) {
            accumulator = accumulator - arr[i - window] / window + arr[i] / window;
            return accumulator;
        } else {
            accumulator += arr[i];
            return u;
        }
    });
}
