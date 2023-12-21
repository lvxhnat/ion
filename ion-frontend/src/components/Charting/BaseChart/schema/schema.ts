import { ChartTypes } from '../type';

export interface DefaultDataProps {
    id: string;
    name: string;
    parent: boolean;
    dataX: Date[];
    dataY: number[];
    color: string;
    type: ChartTypes;
}

export const emptyDefaultDataProps = () => {
    return {
        id: 'line',
        name: '',
        parent: true,
        dataX: [],
        dataY: [],
        color: 'white',
        type: 'line',
    } as DefaultDataProps;
};
