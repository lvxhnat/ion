import * as d3 from 'd3'
import { LINECHARTIDS } from '../../config';
/**
 * 
 * @param svg 
 * @param xAxis xAxis className
 * @param yAxis yAxis className
 * @returns 
 */
export const styleGrid = () => {

    const svg = d3.selectAll(`#${LINECHARTIDS.BASE_SVG_ID}`);

    const setGridLineAttributes = (isFirst: boolean) => {
        /** Styles the grid line to specified opacities
         * @see https://observablehq.com/@d3/styled-axes
         */
        return (
            (g: any) => g.selectAll(`.tick:${isFirst ? 'first-of-type' : 'not(:first-of-type)'} line`)
                .attr("stroke-opacity", 0.2)
                .attr("stroke-dasharray", "2,2"))
    }

    svg.selectAll(`#${LINECHARTIDS.XAXIS_ID}`)
        .call((g: any) => g.select(".domain").remove())
        .call(setGridLineAttributes(true))
        .call(setGridLineAttributes(false));

    svg.selectAll(`#${LINECHARTIDS.YAXIS_ID}`)
        .call((g: any) => g.select(".domain").remove())
        .call(setGridLineAttributes(true))
        .call(setGridLineAttributes(false));

}