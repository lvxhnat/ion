interface BaseCalculationProps {
    arr: number[];
}

export type MovingAverageProps = Omit<SimpleMovingAverageProps, "arr"> | Omit<ExponentialMovingAverageProps, "arr">


export interface SimpleMovingAverageProps extends BaseCalculationProps {
    window?: number;
}
export interface ExponentialMovingAverageProps extends BaseCalculationProps {
    window?: number;
    smoothing?: number;
}