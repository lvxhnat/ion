/**
 * Finds simple moving average, where the last element of the array is the most recent value.
 * @param arr The array containing the prices/time series
 * @param window The window we want to calculate simple moving average for
 */
export function calcSimpleMovingAverage(arr: number[], window: number = 9) {
    let accumulator: number = 0;
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

/**
 * Calculates Exponential Moving Average
 * @param arr
 * @param window
 */
export function calcExponentialMovingAverage(
    arr: number[],
    window: number = 9,
    smoothing: number = 2
) {
    let accumulator: number = 0;
    return new Array(arr.length).fill(null).map((u, i) => {
        if (i == window - 1) {
            accumulator = (accumulator + arr[i]) / window;
            return accumulator;
        } else if (i > window - 1) {
            accumulator =
                arr[i] * (smoothing / (1 + window)) + accumulator * (1 - smoothing / (1 + window));
            return accumulator;
        } else {
            accumulator += arr[i];
            return u;
        }
    });
}
