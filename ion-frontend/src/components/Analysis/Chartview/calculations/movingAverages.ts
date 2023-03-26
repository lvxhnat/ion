import { returnChartAxis } from "components/Charting/BaseChart";
import { addChart } from "components/Charting/BaseChart/actions";

export function addSimpleMovingAverage(props: {
    baseId: string,
    dataX: Date[],
    dataY: number[],
    window: number,
}) {
    const { x, y } = returnChartAxis({
        baseId: props.baseId,
        dataX: props.dataX,
        dataY: props.dataY,
        zeroAxis: false,
    });

    addChart({
        x: x,
        y: y,
        id: "movingAverage",
        baseId: props.baseId,
        dataX: props.dataX,
        dataY: calcSimpleMovingAverage(props.dataY),
        color: "red",
        type: "line",
    });
}

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
