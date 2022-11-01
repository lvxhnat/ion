import * as d3 from 'd3';

import { LineChartProps } from '../LineChart';

type CreateToolTipProps = LineChartProps & {
    x: any,
    y: any,
    svg: d3.Selection<SVGElement, {}, HTMLElement, any>
}

export const createToolTip = (props: Required<CreateToolTipProps>) => {

    const svg = props.svg;

    var bisect = d3.bisector(function (d: any) { return d.date; }).left;

    // Create the text that travels along the curve of chart
    var focusText = svg
        .append('g')
        .append('text')
        .style("opacity", 0)
        .attr("text-anchor", "left")
        .attr("alignment-baseline", "middle")

    // Create a rect on top of the svg area: this rectangle recovers mouse position
    svg
        .append('rect')
        .style("fill", "none")
        .style("pointer-events", "all")
        .attr('width', props.width - props.margin.left)
        .attr('height', props.height)
        .on('mouseover', mouseover)
        .on('mousemove', mousemove)
        .on('mouseout', mouseout);

    function mouseover() {
        focusText.style("opacity", 1)
    }

    function mousemove(e: any) {
        // https://stackoverflow.com/questions/68156231/d3-x-invert-returning-invalid-date-from-d3-pointer-d3-v6
        var x0 = props.x.invert(d3.pointer(e, svg.node())[0]);
        var i = bisect(props.data, x0, 1);
        const selectedData = props.data[i]

        focusText
            .html("x:" + selectedData.date + "  -  " + "y:" + selectedData.value)
            .attr("x", props.x(selectedData.date) + 15)
            .attr("y", props.y(selectedData.value))
    }

    function mouseout() {
        focusText.style("opacity", 0)
    }

}