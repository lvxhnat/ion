import * as React from 'react';
import * as d3 from 'd3';
import { LINECHARTCONFIGS, LINECHARTIDS } from '../../config';

export const addDraw = () => {

    let line: any;

    const svg = d3.selectAll(`#${LINECHARTIDS.BASE_SVG_ID}`);

    const drawContainer = svg
        .append("rect")
        .attr("id", LINECHARTIDS.DRAW_CONTAINER)
        .style("fill", "none")
        .style("pointer-events", "all")
        .attr('width', LINECHARTCONFIGS.DEFAULT_WIDTH - LINECHARTCONFIGS.DEFAULT_MARGIN_LEFT)
        .attr('height', LINECHARTCONFIGS.DEFAULT_HEIGHT)
        .on('mousedown', mousedown)
        .on('mouseup', mouseup)

    function mousedown(e: any) {
        e.preventDefault();
        let m = d3.pointer(e);
        line = svg.append("line")
            .attr("class", LINECHARTIDS.DRAW_LINE_CLASS)
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
        const m = d3.pointer(e);
        line.attr('x2', m[0])
            .attr('y2', m[1]);
    }

    function mouseup() {
        drawContainer.on('mousemove', () => null);
    }
};

export const removeDraw = (): void => {
    d3.selectAll(`#${LINECHARTIDS.BASE_CONTAINER_ID} #${LINECHARTIDS.BASE_SVG_ID} #${LINECHARTIDS.DRAW_CONTAINER}`).remove();
}

export const existDrawnLines = (): boolean => {
    return !d3.selectAll(`#${LINECHARTIDS.BASE_CONTAINER_ID} #${LINECHARTIDS.BASE_SVG_ID} .${LINECHARTIDS.DRAW_LINE_CLASS}`).empty()
}

export const removeDrawnLines = (): void => {
    d3.selectAll(`#${LINECHARTIDS.BASE_CONTAINER_ID} #${LINECHARTIDS.BASE_SVG_ID} .${LINECHARTIDS.DRAW_LINE_CLASS}`).remove();
}