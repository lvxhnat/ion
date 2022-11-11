import {
    GeneralTableProps,
    GeneralTableTypeProp,
} from '../components/Header/IndicatorPopup/ChoiceTable/configs';
import * as Momentum from './momentum';

export interface IndicatorEngineProps extends GeneralTableProps<number[]> {}

export interface IndicatorType extends GeneralTableTypeProp<number[]> {
    id: string;
    name: string;
    callback: (arr: number[], ...params: any) => number[];
}

export const INDICATOR_ENGINE: { [key: string]: IndicatorEngineProps } = {
    momentumIndicators: {
        id: 'momentumIndicators',
        name: 'Momentum',
        types: [
            { id: 'sma', name: 'Simple Moving Average', callback: Momentum.calculateSMA },
            { id: 'ema', name: 'Exponential Moving Average', callback: Momentum.calculateEMA },
        ],
    },
    volatilityIndicators: {
        id: 'volatilityIndicators',
        name: 'Volatility',
        types: [],
    },
};
