import * as React from 'react';
import * as d3 from 'd3';
import { CHARTCONFIGS, CHARTIDS } from '../../config';

export const addDraw = (props: { baseId: string }) => {
    let line: any;

    const svg = d3.selectAll(`#${props.baseId}`);

    const drawContainer = svg
        .append('rect')
        .attr('id', `${props.baseId}_${CHARTIDS.DRAW_CONTAINER_ID}`)
        .style('fill', 'none')
        .style('pointer-events', 'all')
        .attr('width', CHARTCONFIGS.DEFAULT_WIDTH - CHARTCONFIGS.DEFAULT_MARGIN.left)
        .attr('height', CHARTCONFIGS.DEFAULT_HEIGHT)
        .on('mousedown', mousedown)
        .on('mouseup', mouseup);

    function mousedown(e: MouseEvent) {
        e.stopPropagation();
        e.stopImmediatePropagation();
        e.preventDefault();

        const m = d3.pointer(e);
        line = svg
            .append('line')
            .attr('class', `${props.baseId}_${CHARTIDS.DRAW_LINE_CLASS}`)
            .attr('x1', m[0])
            .attr('y1', m[1])
            .attr('x2', m[0])
            .attr('y2', m[1])
            .attr('stroke-width', CHARTCONFIGS.DEFAULT_LINE_STROKE_WIDTH)
            .attr('stroke', 'green');
        drawContainer.on('mousemove', mousemove);
    }

    function mousemove(e: MouseEvent) {
        const m = d3.pointer(e);
        line.attr('x2', m[0]).attr('y2', m[1]);
    }

    function mouseup(e: MouseEvent) {
        e.stopPropagation();
        e.stopImmediatePropagation();
        e.preventDefault();

        drawContainer.on('mousemove', () => null);
    }
};

export const removeDraw = (props: { baseId: string }): void => {
    d3.selectAll(
        `#${props.baseId}-container #${props.baseId} #${props.baseId}_${CHARTIDS.DRAW_CONTAINER_ID}`
    ).remove();
};

export const removeDrawnLines = (props: { baseId: string }): void => {
    d3.selectAll(
        `#${props.baseId}-container #${props.baseId} .${props.baseId}_${CHARTIDS.DRAW_LINE_CLASS}`
    ).remove();
};
