export type IndicatorProps = IndicatorProp[];

interface IndicatorTableDataType {
    date: string;
    value: number;
}

export interface IndicatorProp {
    type: string;
    subTypes: Array<{ subType: string; callback: () => IndicatorTableDataType }>;
}
