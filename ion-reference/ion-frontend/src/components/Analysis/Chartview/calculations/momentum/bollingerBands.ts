import { BollingerBandReturnType } from '../schemas/dtos/momentum';
import { BollingerBandProps } from '../schemas/props/schema/momentum';

/**
 * Returns the bollinger band values given an average type.
 * @remarks
 * STATIC TIME SERIES
 *
 * @param {number[]} arr The array containing the prices/time series. Latest value in the last index.
 * @param {'simple' | 'exponential'} averageType[Optional] The type of average to use.
 * @param {number} window[Optional] The sliding window size;
 * @param {number} stdDown[Optional] the number of standard deviations for the down band;
 * @param {number} stdUp[Optional] the number of standard deviations for the up band;
 *
 * @formulae
 * Exponential STD :: s_i^2 = S_i = (1 - alpha)(S_(i - 1) + alpha(x_i - u_(i - 1))^2)
 *
 * where s_i is the sample standard deviation at time i
 *       S_i is the sample variance at time i
 *       u_i is the estimated exponential weighted average at time i
 *       x_i is the observation value at time i
 *
 * @references
 * https://stats.stackexchange.com/questions/111851/standard-deviation-of-an-exponentially-weighted-mean
 */
export function calcBollingerBand(props: BollingerBandProps): BollingerBandReturnType {
    let avgAccumulator: number = props.arr[0];
    let stdAccumulator: number = 0;

    const smoothing: number = props.smoothing ? +props.smoothing : 2; // Only required when exponential is used
    const averageType: string = props.averageType ?? 'exponential';
    const window: number = props.window ? +props.window : 9;
    const stdUp: number = props.stdUp ? +props.stdUp : 2.5;
    const stdDown: number = props.stdDown ? +props.stdDown : stdUp;

    let avgArr = new Array(props.arr.length).fill(null);
    let stdupArr = new Array(props.arr.length).fill(null);
    let stdDownArr = new Array(props.arr.length).fill(null);

    let calcAvg: (currIndex: number) => number;
    let calcStd: (currIndex: number, newAvg: number) => number;
    if (averageType === 'simple') {
        calcAvg = currIndex =>
            avgAccumulator + (props.arr[currIndex] - props.arr[currIndex - window]) / window;
        calcStd = (currIndex, newAvg) =>
            Math.sqrt(
                stdAccumulator ** 2 +
                    (props.arr[currIndex] - props.arr[currIndex - window]) *
                        (props.arr[currIndex] -
                            newAvg +
                            props.arr[currIndex - window] -
                            avgAccumulator)
            );
    } else {
        const alpha: number = smoothing / (1 + window);
        calcAvg = currIndex => props.arr[currIndex] * alpha + avgAccumulator * (1 - alpha);
        calcStd = (currIndex, _) =>
            Math.sqrt(
                (1 - alpha) *
                    (stdAccumulator ** 2 + alpha * (props.arr[currIndex] - avgAccumulator) ** 2)
            );
    }

    props.arr.map((u, i) => {
        if (i == window - 1) {
            // SMA
            avgAccumulator = (avgAccumulator + u) / window;
            // Get sum of squares, precursor to standard deviation
            let sumOfSquares = 0;
            for (let j = 0; j < window - 1; j++) {
                sumOfSquares += (props.arr[j] - avgAccumulator) ** 2;
            }
            stdAccumulator = Math.sqrt(sumOfSquares / (window - 1));
            // Allocate to array
            avgArr[i] = avgAccumulator;
            stdupArr[i] = avgAccumulator + stdUp * stdAccumulator;
            stdDownArr[i] = avgAccumulator - stdDown * stdAccumulator;
        } else if (i > window - 1) {
            const newAvg = calcAvg(i);
            stdAccumulator = calcStd(i, newAvg);
            avgAccumulator = newAvg;
            avgArr[i] = newAvg;
            stdupArr[i] = avgAccumulator + stdUp * stdAccumulator;
            stdDownArr[i] = avgAccumulator - stdUp * stdAccumulator;
        } else {
            avgAccumulator += u;
        }
    });

    return {
        avg: avgArr,
        stdUp: stdupArr,
        stdDown: stdDownArr,
    };
}
