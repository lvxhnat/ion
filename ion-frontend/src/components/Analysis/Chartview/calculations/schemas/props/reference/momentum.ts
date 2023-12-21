type NumericType = [number, number]; // Range limit
type ChoiceType = string[]; // Choice allowances

export type JSONMetricPropTypes = {
    [param: string]: {
        type: 'integer' | 'float' | 'choice';
        format: NumericType | ChoiceType;
    };
};

export const SimpleMovingAverageJSONProps: JSONMetricPropTypes = {
    window: { type: 'integer', format: [5, 30] },
};

export const ExponentialMovingAverageJSONProps: JSONMetricPropTypes = {
    window: { type: 'integer', format: [5, 30] },
    smoothing: { type: 'integer', format: [0, 30] },
};

export const BollingerBandJSONProps: JSONMetricPropTypes = {
    window: { type: 'integer', format: [5, 30] },
    smoothing: { type: 'integer', format: [0, 30] },
    averageType: { type: 'choice', format: ['simple', 'exponential'] },
    stdDown: { type: 'float', format: [1, 4] },
    stdUp: { type: 'float', format: [1, 4] },
};
