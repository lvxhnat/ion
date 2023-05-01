import { ChartTypes } from "../type";

export interface DefaultDataProps {
    id: string;
    name: string;
    parent: boolean;
    dataX: Date[];
    dataY: number[];
    color: string;
    type: ChartTypes;
}