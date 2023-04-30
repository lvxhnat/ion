import { TechnicalIndicatorsKeys } from 'store/prices/watchlist';
import { calcSimpleMovingAverage, calcExponentialMovingAverage } from './momentum/movingAverages';
import { ExponentialMovingAverageProps } from './schemas/props/schema';
import { calcBollingerBand } from './momentum/bollingerBands';
import {
    BollingerBandJSONProps,
    ExponentialMovingAverageJSONProps,
    JSONMetricPropTypes,
    SimpleMovingAverageJSONProps,
} from './schemas/props/reference/momentum';

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

export interface NumericalBoundary {
    min: number;
    max: number;
}

interface TechnicalIndicatorTypes {
    shortName: string;
    function: Function;
    schema: JSONMetricPropTypes;
    defaultParams: { [params: string]: any };
    description?: string;
}

export const technicalIndicators: { [indicator: string]: TechnicalIndicatorTypes } = {
    SimpleMovingAverage: {
        shortName: 'SMA',
        function: calcSimpleMovingAverage,
        defaultParams: { window: 9 },
        description:
            'A simple moving average (SMA) is an arithmetic moving average calculated by adding recent prices and then dividing that figure by the number of time periods in the calculation average.',
        schema: SimpleMovingAverageJSONProps,
    },
    ExponentialMovingAverage: {
        shortName: 'EMA',
        function: calcExponentialMovingAverage,
        defaultParams: { window: 9, smoothing: 2 } as {
            [param in keyof ExponentialMovingAverageProps]: number;
        },
        description:
            'An exponential moving average (EMA) is a type of moving average that places a greater weight and significance on the most recent data points.',
        schema: ExponentialMovingAverageJSONProps,
    },
    BollingerBand: {
        shortName: 'BollingerBand',
        function: calcBollingerBand,
        defaultParams: {
            averageType: 'exponential',
            stdDown: 2.5,
            stdUp: 2.5,
            window: 14,
            smoothing: 2,
        },
        description:
            'Bollinger Bands are envelopes plotted at a standard deviation level above and below a simple moving average of the price. Because the distance of the bands is based on standard deviation, they adjust to volatility swings in the underlying price',
        schema: BollingerBandJSONProps,
    },
};
