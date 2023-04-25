import { ExponentialMovingAverageProps, SimpleMovingAverageProps } from './types/movingAverages';
/**
 * Finds simple moving average, where the last element of the array is the most recent value.
 * @param arr The array containing the prices/time series
 * @param window The window we want to calculate simple moving average for
 */
export function calcSimpleMovingAverage(props: SimpleMovingAverageProps) {
    let accumulator: number = 0;
    let window: number = props.window ?? 9;

    return new Array(props.arr.length).fill(null).map((u, i) => {
        if (i == window - 1) {
            accumulator = (accumulator + props.arr[i]) / window;
            return accumulator;
        } else if (i > window - 1) {
            accumulator = accumulator - props.arr[i - window] / window + props.arr[i] / window;
            return accumulator;
        } else {
            accumulator += props.arr[i];
            return u;
        }
    });
}

/**
 * Calculates Exponential Moving Average
 * @param arr The array containing the prices/time series
 * @param window The window we want to calculate simple moving average for
 * @param smoothing The smoothing factor
 */
export function calcExponentialMovingAverage(props: ExponentialMovingAverageProps) {
    let window: number = props.window ?? 9;
    let smoothing: number = props.smoothing ?? 2;
    let accumulator: number = 0;
    return new Array(props.arr.length).fill(null).map((u, i) => {
        if (i == window - 1) {
            accumulator = (accumulator + props.arr[i]) / window;
            return accumulator;
        } else if (i > window - 1) {
            accumulator =
                props.arr[i] * (smoothing / (1 + window)) +
                accumulator * (1 - smoothing / (1 + window));
            return accumulator;
        } else {
            accumulator += props.arr[i];
            return u;
        }
    });
}
