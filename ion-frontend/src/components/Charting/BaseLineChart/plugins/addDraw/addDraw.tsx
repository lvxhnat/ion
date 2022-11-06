import * as React from 'react';
import * as d3 from 'd3';
import { LineChartConfig } from '../../config';

export const addDraw = () => {

    let line: any;

    const svg = d3.selectAll("#linechart-svg-container #linechart")

    const drawContainer = svg
        .append("rect")
        .attr("id", "draw-rect")
        .style("fill", "none")
        .style("pointer-events", "all")
        .attr('width', LineChartConfig.DEFAULT_WIDTH - LineChartConfig.DEFAULT_MARGIN_LEFT)
        .attr('height', LineChartConfig.DEFAULT_HEIGHT)
        .on('mousedown', mousedown)
        .on('mouseup', mouseup)

    function mousedown(e: any) {
        e.preventDefault();
        let m = d3.pointer(e);
        line = svg.append("line")
            .attr("class", "drawLine")
            .attr("x1", m[0])
            .attr("y1", m[1])
            .attr("x2", m[0])
            .attr("y2", m[1])
            .attr("stroke-width", 2)
            .attr("stroke", "green");
        drawContainer.on('mousemove', mousemove);
    }

    function mousemove(e: any) {
        e.preventDefault();
        let m = d3.pointer(e);
        line.attr("x2", m[0])
            .attr("y2", m[1]);
    }

    function mouseup() {
        drawContainer.on("mousemove", () => null);
    }
}

export const removeDraw = () => {
    d3.selectAll("#linechart-svg-container #linechart #draw-rect").remove()
}