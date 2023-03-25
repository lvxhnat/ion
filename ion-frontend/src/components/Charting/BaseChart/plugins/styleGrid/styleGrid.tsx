import * as d3 from 'd3';
import { CHARTCONFIGS, CHARTIDS } from '../../config';
/**
 *
 * @param svg
 * @param xAxis xAxis className
 * @param yAxis yAxis className
 * @returns
 */
export const styleGrid = (props: { baseId: string }) => {
    const svg = d3.selectAll(`#${props.baseId}`);
    const opacity: number = 0.3;

    const setGridLineAttributes = (isFirst: boolean) => {
        /** Styles the grid line to specified opacities
         * @see https://observablehq.com/@d3/styled-axes
         */
        return (g: any) =>
            g
                .selectAll(
                    `#${props.baseId} .tick:${
                        isFirst ? 'first-of-type' : 'not(:first-of-type)'
                    } line`
                )
                .attr('stroke-opacity', opacity)
                .attr('stroke-width', CHARTCONFIGS.DEFAULT_LINE_STROKE_WIDTH)
                .attr('stroke-dasharray', '2,2');
    };

    svg.selectAll(`#${props.baseId}_${CHARTIDS.XAXIS_ID}`)
        .call((g: any) => g.select('.domain').remove())
        .call(setGridLineAttributes(true))
        .call(setGridLineAttributes(false));

    svg.selectAll(`#${props.baseId}_${CHARTIDS.YAXIS_ID}`)
        .call((g: any) => g.select('.domain').remove())
        .call(setGridLineAttributes(true))
        .call(setGridLineAttributes(false));

    const width = document.getElementById(props.baseId)!.parentNode!.parentElement!.clientWidth;
    const height = document.getElementById(props.baseId)!.parentNode!.parentElement!.clientHeight;

    svg.append('line')
        .attr('class', 'axisXGridLine')
        .attr('x1', 0)
        .attr('y1', height - 10)
        .attr('x2', width)
        .attr('y2', height - 10)
        .attr('stroke-width', CHARTCONFIGS.DEFAULT_LINE_STROKE_WIDTH)
        .attr('opacity', opacity)
        .attr('stroke', 'white');

    svg.append('line')
        .attr('class', 'axisXGridLine')
        .attr('x1', width)
        .attr('y1', -10)
        .attr('x2', width)
        .attr('y2', height)
        .attr('stroke-width', CHARTCONFIGS.DEFAULT_LINE_STROKE_WIDTH)
        .attr('opacity', opacity)
        .attr('stroke', 'white');
};
