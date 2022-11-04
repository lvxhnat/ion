import * as d3 from 'd3';

export const addLine = (props: {
    x: any,
    y: any,
    id: string,
    indexes: Array<number>,
    dataX: Array<Date>,
    dataY: Array<number>,
    svg: d3.Selection<SVGElement, {}, HTMLElement, any>,
}) => {
    const svg = props.svg;
    const defined = d3.map(props.dataY, (_, i) => !isNaN(props.dataY[i]));

    var valueLine: any = d3.line()
        .defined((_, i: number) => defined[i])
        .x((_, i: number) => props.x(props.dataX[i]))
        .y((_, i: number) => props.y(props.dataY[i]));

    svg.append("path")
        .attr("id", "next")
        .attr("fill", "none")
        .attr("stroke", "yellow")
        .attr("stroke-width", 1)
        .attr("d", valueLine(props.indexes.filter(i => defined[i])));

}