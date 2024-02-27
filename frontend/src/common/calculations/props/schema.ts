interface BaseCalculationProps {
  arr: number[];
}

export type MovingAverageProps =
  | Omit<SimpleMovingAverageProps, "arr">
  | Omit<ExponentialMovingAverageProps, "arr">;

export interface SimpleMovingAverageProps extends BaseCalculationProps {
  window?: number;
}
export interface ExponentialMovingAverageProps
  extends SimpleMovingAverageProps {
  smoothing?: number;
}
/**
 * Interface makes use of the average type "exponential" which encompasses the simple moving average item
 */
export interface BollingerBandProps extends ExponentialMovingAverageProps {
  averageType?: "simple" | "exponential";
  stdDown?: number;
  stdUp?: number;
}
