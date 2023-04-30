import { ExponentialMovingAverageProps, SimpleMovingAverageProps } from '../schemas/props/schema';

/**
 * Finds simple moving average, where the last element of the array is the most recent value.
 * @remarks
 * STATIC TIME SERIES
 *
 * @param arr The array containing the prices/time series
 * @param window The window we want to calculate simple moving average for
 */
export function calcSimpleMovingAverage(props: SimpleMovingAverageProps): number[] {
    let accumulator: number = 0;
    let window: number = props.window ? +props.window : 9;

    return new Array(props.arr.length).fill(null).map((u, i) => {
        if (i == window - 1) {
            accumulator = (accumulator + props.arr[i]) / window;
            return accumulator;
        } else if (i > window - 1) {
            accumulator = accumulator + (props.arr[i] - props.arr[i - window]) / window;
            return accumulator;
        } else {
            accumulator += props.arr[i];
            return u;
        }
    });
}

/**
 * Calculates Exponential Moving Average
 * @remarks
 * STATIC TIME SERIES
 * The multiplier used is calculated by multiplier = smoothing / (1 + window).
 * Therefore, a higher smoothing factor will provide you higher weight to recent day prices.
 * The alpha parameter of an exponential moving average defines the smoothing that the average applies to a time series. In a similar way, the window size of a moving window mean also defines the smoothing.
 *
 * @param arr The array containing the prices/time series
 * @param window The window we want to calculate simple moving average for
 * @param smoothing The smoothing factor
 */
export function calcExponentialMovingAverage(props: ExponentialMovingAverageProps): number[] {
    let window: number = props.window ? +props.window : 9;
    let smoothing: number = props.smoothing ? +props.smoothing : 2;
    let accumulator: number = 0;

    const alpha = smoothing / (1 + window);

    return new Array(props.arr.length).fill(null).map((u, i) => {
        if (i == window - 1) {
            accumulator = (accumulator + props.arr[i]) / window;
            return accumulator;
        } else if (i > window - 1) {
            accumulator = props.arr[i] * alpha + accumulator * (1 - alpha);
            console.log(accumulator, window);
            return accumulator;
        } else {
            accumulator += props.arr[i];
            return u;
        }
    });
}
