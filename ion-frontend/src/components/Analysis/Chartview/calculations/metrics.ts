import { calcSimpleMovingAverage, calcExponentialMovingAverage } from './movingAverages';

export const technicalIndicators: { [indicator: string]: any } = {
    SimpleMovingAverage: calcSimpleMovingAverage,
    ExponentialMovingAverage: calcExponentialMovingAverage,
};

export const technicalIndicatorsParams: { [indicator: keyof typeof technicalIndicators]: { [parameters: string]: any } } = {
    SimpleMovingAverage: {
        window: 9,
    },
    ExponentialMovingAverage: {
        window: 9,
        smoothing: 2,
    }
}