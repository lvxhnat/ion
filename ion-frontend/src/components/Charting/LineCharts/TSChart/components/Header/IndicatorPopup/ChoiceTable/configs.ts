import * as React from 'react';
import { INDICATOR_ENGINE } from 'components/Charting/LineCharts/TSChart/helpers/indicators';

export interface GeneralTableProps<T> {
    id: string;
    name: string;
    types: GeneralTableTypeProp<T>[];
}

export interface GeneralTableTypeProp<T> {
    id: string;
    name: string;
    callback: ((arr: T, ...params: any) => T) | ((params: T) => T);
}

export type GeneralTableActionType = GeneralTableProps<any>[];
