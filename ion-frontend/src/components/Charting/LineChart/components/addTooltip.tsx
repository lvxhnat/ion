import * as d3 from 'd3';
import { LineChartProps } from '../type';

type CreateToolTipProps = LineChartProps & {
    x: any,
    y: any,
    svg: d3.Selection<SVGElement, {}, HTMLElement, any>,
}

export const addToolTip = (props: Required<CreateToolTipProps>) => {

    const svg = props.svg;

    const bisect = d3.bisector(function (d: any) { return d.date; }).left;
    const focus = svg.append("g").style("opacity", 0);

    const fontColor = "white"

    // Create the text that travels along the curve of chart
    const tooltip = d3.selectAll("#linechart-tooltip")
        .append('div')
        .attr('id', 'tooltip')
        .style("opacity", 0)
        .style("font-size", "10px")
        .style("color", fontColor)
        .style("text-align", "center")
        .attr("alignment-baseline", "middle")

    // append the circle at the intersection               
    focus.append("circle")
        .attr("id", "tooltip-point-tracker")
        .style("fill", "none")
        .style("stroke", fontColor)
        .attr("r", 4);

    if (props.tooltipCrosshairs) {
        focus.append("line")
            .attr("id", "tooltip-y-line")
            .style("stroke", fontColor)
            .style("stroke-dasharray", "3,3")
            .style("opacity", 0.5)
            .attr("x1", props.margin.left)
            .attr("x2", props.width - props.margin.right);
    }

    focus.append("line")
        .attr("id", "tooltip-x-line")
        .style("stroke", fontColor)
        .style("stroke-dasharray", "3,3")
        .style("opacity", 0.5)
        .attr("y1", props.margin.bottom)
        .attr("y2", props.height - props.margin.top);

    // Create a rect on top of the svg area: this rectangle recovers mouse position
    svg.append('rect')
        .style("fill", "none")
        .style("pointer-events", "all")
        .attr('width', props.width - props.margin.left)
        .attr('height', props.height)
        .on('mouseover', mouseover)
        .on('mousemove', mousemove)
        .on('mouseout', mouseout);

    function mouseover() {
        tooltip.style("opacity", 1);
        focus.style("opacity", 1);
    }

    function mousemove(e: any) {
        // https://stackoverflow.com/questions/68156231/d3-x-invert-returning-invalid-date-from-d3-pointer-d3-v6
        var x0 = props.x.invert(d3.pointer(e, svg.node())[0]);
        const i = bisect(props.data, x0, 1);
        const d0: any = props.data[i - 1]
        const d1: any = props.data[i]
        if (d0 && d1) {
            const d = x0 - d0.date > d1.date - x0 ? d1 : d0;

            tooltip.html(`<b>Date:</b> ${d.date} <b>Price:</b> $ ${d.value}`)

            focus.select("#tooltip-point-tracker")
                .attr("transform", `translate(${props.x(d.date)}, ${props.y(d.value)})`);

            focus.select("#tooltip-x-line")
                .attr("transform", `translate(${props.x(d.date)}, 0)`);

            if (props.tooltipCrosshairs) {
                focus.select("#tooltip-y-line")
                    .attr("transform", `translate(0, ${props.y(d.value)})`)
                    .attr("x2", props.width);
            }
        }
    }

    function mouseout() {
        tooltip.style("opacity", 0);
        focus.style("opacity", 0);
    }

}