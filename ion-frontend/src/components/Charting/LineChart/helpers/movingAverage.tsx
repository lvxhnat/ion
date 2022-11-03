/**
 * Calculate SMA of an array with O(N) time but O(N) space
 * For example, an SMA of period 3, the algorithm is as follows:  
 * [0, 1, 2, 3, 4, 5, 6]
 *  |_ NA
 *     |_ NA 
 *        |_ (0 + 1 + 2) / 3 = 1 (t = 3)
 *           |_ (1 + (3 - 0) / 3) = 2 (t = 4)
 *               |_ (2 + (4 - 1) / 3) = 3 (t = 5)
 * ... 
 * @param array Containing the values we wish to calculate SMA for
 * @param period 
 */
export function calculateSMA(
    array: Array<number>,
    period: number,
    decimalPlaces = 2
) {
    let currSum: number = 0;
    let roundConst: number = Math.pow(10, decimalPlaces);
    let sma = new Array(array.length);

    for (let i = 0; i < array.length; i++) {
        if (i < period) {
            currSum += array[i];
            sma[i] = NaN;
        }
        else {
            currSum += (array[i] - array[i - period]) / period;
            sma[i] = Math.round(currSum * roundConst) / roundConst;
        }
    }

    return sma;
}

export function calculateEMA(
    array: Array<number>,
    period: number,
    smoothing = 2,
    decimalPlaces = 2,
) {

}