import { ColorsEnum } from 'common/theme';
import * as d3 from 'd3';
import { CHARTIDS } from '../../config';
import { OHLCDataSchema } from '../../schema/schema';

export const addCandleStick = (props: {
    x: d3.ScaleTime<number, number, never>;
    y: d3.ScaleLinear<number, number, never>;
    baseId: string;
    dataX: Date[];
    dataY: OHLCDataSchema[];
}): void => {
    const svg = d3.selectAll(`#${props.baseId}`);
    const rectWidth = props.x(Math.max(...props.dataX.map(d => d.getTime()))) / props.dataX.length;

    var chart = svg
        .append('g')
        .attr('class', `${props.baseId}_${CHARTIDS.CANDLESTICK_GROUP_CLASS}`)
        .attr('clip-path', 'url(#clip)');

    // draw rectangles
    chart
        .selectAll(CHARTIDS.CANDLESTICK_CANDLE_CLASS)
        .data(props.dataY)
        .enter()
        .append('rect')
        .attr('x', (_, i) => props.x(props.dataX[i]))
        .attr('class', CHARTIDS.CANDLESTICK_CANDLE_CLASS)
        .attr('y', d => props.y(Math.max(d.open, d.close)))
        .attr('width', rectWidth)
        .attr('height', d => Math.abs(props.y(d.close) - props.y(d.open)))
        .attr('fill', d =>
            d.close === d.open
                ? ColorsEnum.white
                : d.close > d.open
                ? ColorsEnum.upHint
                : ColorsEnum.downHint
        );

    chart
        .selectAll(CHARTIDS.CANDLESTICK_WICK_CLASS)
        .data(props.dataY)
        .enter()
        .append('line')
        .attr('class', CHARTIDS.CANDLESTICK_WICK_CLASS)
        .attr('x1', (_, i) => props.x(props.dataX[i]))
        .attr('x2', (_, i) => props.x(props.dataX[i]))
        .attr('y1', d => props.y(d.high))
        .attr('y2', d => props.y(d.low))
        .attr('stroke-width', rectWidth / 4)
        .attr('stroke', d =>
            d.close === d.open
                ? ColorsEnum.white
                : d.close > d.open
                ? ColorsEnum.upHint
                : ColorsEnum.downHint
        );
};
