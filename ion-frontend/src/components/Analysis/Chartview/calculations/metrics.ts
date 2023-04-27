import { TechnicalIndicatorsKeys } from 'store/prices/watchlist';
import { calcSimpleMovingAverage, calcExponentialMovingAverage } from './movingAverages';

export const indicatorIdDelimiter: string = '__';

export const getIndicatorIdFromMetric = (
    ticker: string,
    parameters: { [parameter: string]: any }
): string => {
    return ticker + indicatorIdDelimiter + Object.keys(parameters).join(indicatorIdDelimiter);
};

export const getIndicatorMetricFromId = (indicatorId: string): Function => {
    return technicalIndicators[
        indicatorId.split(indicatorIdDelimiter)[0] as TechnicalIndicatorsKeys
    ];
};

export const technicalIndicators: { [indicator: string]: Function } = {
    SimpleMovingAverage: calcSimpleMovingAverage,
    ExponentialMovingAverage: calcExponentialMovingAverage,
};

export const technicalIndicatorsParams: {
    [indicator: keyof typeof technicalIndicators]: { [parameters: string]: any };
} = {
    SimpleMovingAverage: {
        window: 9,
    },
    ExponentialMovingAverage: {
        window: 9,
        smoothing: 2,
    },
};
