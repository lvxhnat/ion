import { TechnicalIndicatorsKeys } from 'store/prices/watchlist';
import { calcSimpleMovingAverage, calcExponentialMovingAverage } from './movingAverages';

export const indicatorIdDelimiter: string = '__';

export const getIndicatorIdFromMetric = (
    ticker: string,
    parameters: { [parameter: string]: any }
): string => {
    return ticker + indicatorIdDelimiter + Object.values(parameters).join(indicatorIdDelimiter);
};

export const getIndicatorMetricFromId = (indicatorId: string): Function => {
    return technicalIndicators[
        indicatorId.split(indicatorIdDelimiter)[0] as TechnicalIndicatorsKeys
    ].function;
};

interface TechnicalIndicatorTypes {
    shortName: string;
    function: Function;
    defaultParams: { [params: string]: any };
}
export const technicalIndicators: { [indicator: string]: TechnicalIndicatorTypes } = {
    SimpleMovingAverage: {
        shortName: 'SMA',
        function: calcSimpleMovingAverage,
        defaultParams: { window: 9 },
    },
    ExponentialMovingAverage: {
        shortName: 'EMA',
        function: calcExponentialMovingAverage,
        defaultParams: { window: 9, smoothing: 2 },
    },
};

export const technicalIndicatorsParams: {
    [indicator: TechnicalIndicatorsKeys]: { [parameters: string]: any };
} = {
    SimpleMovingAverage: {
        window: 9,
    },
    ExponentialMovingAverage: {
        window: 9,
        smoothing: 2,
    },
};
