import { calcSimpleMovingAverage, calcExponentialMovingAverage } from './movingAverages';

export const technicalIndicators = {
    SimpleMovingAverage: calcSimpleMovingAverage,
    ExponentialMovingAverage: calcExponentialMovingAverage,
};
