interface IndicatorConfigs {
    name: string;
    id: string;
    configs: {};
}

export const MOMENTUM_INDICATORS: IndicatorConfigs[] = [
    { name: 'Simple Moving Average', id: 'sma', configs: {} },
    { name: 'Exponential Moving Average', id: 'ema', configs: {} },
];
