/**
 * 
 * @param svg 
 * @param xAxis xAxis className
 * @param yAxis yAxis className
 * @returns 
 */
export const styleGrid = (props: {
    svg: d3.Selection<SVGElement, {}, HTMLElement, any>,
    xAxis: string,
    yAxis: string
}) => {

    const svg = props.svg;

    const setGridLineAttributes = (isFirst: boolean) => {
        /** Styles the grid line to specified opacities
         * @see https://observablehq.com/@d3/styled-axes
         */
        return (
            (g: any) => g.selectAll(`.tick:${isFirst ? 'first-of-type' : 'not(:first-of-type)'} line`)
                .attr("stroke-opacity", 0.2)
                .attr("stroke-dasharray", "2,2"))
    }

    svg.selectAll(props.xAxis)
        .call((g: any) => g.select(".domain").remove())
        .call(setGridLineAttributes(true))
        .call(setGridLineAttributes(false));

    svg.selectAll(props.yAxis)
        .call((g: any) => g.select(".domain").remove())
        .call(setGridLineAttributes(true))
        .call(setGridLineAttributes(false));

}