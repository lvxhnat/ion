export type DataType = Array<{ date: string, value: number }>

export type LineChartProps = {
    data: DataType,
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