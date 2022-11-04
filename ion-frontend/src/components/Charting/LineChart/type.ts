export type LineChartProps = {
    dataX: Array<string>,
    dataY: Array<number>,
    width?: number,
    height?: number,
    margin?: {
        top: number
        bottom: number
        left: number
        right: number
    },
    timeParseFormat?: string,
    normaliseY?: boolean,
    tooltipCrosshairs?: boolean,
}