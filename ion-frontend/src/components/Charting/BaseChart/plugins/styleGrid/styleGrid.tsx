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
                .attr('stroke-opacity', 0.3)
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
};
