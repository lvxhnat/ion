import { ColorsEnum } from 'common/theme';
import * as d3 from 'd3';
import { OHLCHistoricalDTO } from 'endpoints/schema/tickers';
import { CHARTIDS } from '../../config';

export const addOHLC = (props: {
    x: d3.ScaleTime<number, number, never>;
    y: d3.ScaleLinear<number, number, never>;
    baseId: string;
    dataX: Date[];
    dataY: OHLCHistoricalDTO[];
    variation: 'candleStick' | 'barStick';
}): void => {
    const svg = d3.selectAll(`#${props.baseId}`);
    let rectWidth = props.x(Math.max(...props.dataX.map(d => d.getTime()))) / props.dataX.length;
    rectWidth = rectWidth * 0.5; // Create some padding

    var chart = svg
        .append('g')
        .attr('class', `${props.baseId}_${CHARTIDS.CANDLESTICK_GROUP_CLASS}`)
        .attr('clip-path', 'url(#clip)');

    if (props.variation === 'candleStick') {
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
    } else {
        chart
            .selectAll(CHARTIDS.CANDLESTICK_CANDLE_CLASS)
            .data(props.dataY)
            .enter()
            .append('line')
            .attr('class', CHARTIDS.CANDLESTICK_CANDLE_CLASS)
            .attr('x1', (_, i) => props.x(props.dataX[i]))
            .attr('x2', (_, i) => props.x(props.dataX[i]) + rectWidth / 1.5)
            .attr('y1', d => props.y(d.open))
            .attr('y2', d => props.y(d.open))
            .attr('stroke-width', rectWidth / 4)
            .attr('stroke', ColorsEnum.white);

        chart
            .selectAll(CHARTIDS.CANDLESTICK_CANDLE_CLASS)
            .data(props.dataY)
            .enter()
            .append('line')
            .attr('class', CHARTIDS.CANDLESTICK_CANDLE_CLASS)
            .attr('x1', (_, i) => props.x(props.dataX[i]) - rectWidth / 1.5)
            .attr('x2', (_, i) => props.x(props.dataX[i]))
            .attr('y1', d => props.y(d.close))
            .attr('y2', d => props.y(d.close))
            .attr('stroke-width', rectWidth / 4)
            .attr('stroke', ColorsEnum.white);
    }

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
            d.close === d.open || props.variation === 'barStick'
                ? ColorsEnum.white
                : d.close > d.open
                ? ColorsEnum.upHint
                : ColorsEnum.downHint
        );
};
