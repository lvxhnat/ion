import * as d3 from 'd3';
import * as d3_hexbin from 'd3-hexbin';
import * as React from 'react';

import { useD3 } from 'common/hooks/useD3';

interface HexLayerProps {
    baseId: string;
}

export default function HexLayer({ baseId }: HexLayerProps): React.ReactElement {
    const ref = useD3((svg: d3.Selection<SVGElement, {}, HTMLElement, any>) => {
        // Ensure rerender does not duplicate chart
        const width = 1200;
        const height = 150;
        const margin = {
            top: 10,
            bottom: 10,
            left: 10,
            right: 10,
        };
        // Initialise the canvas
        svg.attr('viewBox', [0, 0, width + margin.right + margin.left, height + margin.top * 1.5])
            .attr('preserveAspectRatio', 'xMidYMid meet')
            .classed('svg-content-responsive', true)
            .attr('stroke-width', 0);
        // Create the x and y axis
        const x = d3.scaleLinear().range([margin.left, width - margin.right]);
        const y = d3.scaleLinear().range([height - margin.top, margin.bottom]);
        const xAxis = d3
            .axisLeft(x)
            .tickSize(margin.left + margin.right - width)
            .ticks(0);
        const yAxis = d3
            .axisLeft(y)
            .tickSize(margin.bottom + margin.top - height)
            .ticks(0);
        svg.append('g')
            .attr('transform', `translate(0,${height - margin.top})`)
            .attr('id', `${baseId}_xAxisId`) // Sets a class name for our x axis
            .call(xAxis);
        svg.append('g')
            .attr('transform', `translate(${margin.left},0)`)
            .attr('id', `${baseId}_yAxisId`) // Set a class name for our y axis
            .call(yAxis);

        //
        const radius = 2;
        const hexbin = d3_hexbin
            .hexbin()
            .x((d: any) => x(d.x))
            .y((d: any) => y(d.y))
            .radius((radius * width) / (height - 1))
            .extent([
                [margin.left, margin.top],
                [width - margin.right, height - margin.bottom],
            ]);
    }, []);

    return (
        <div id={`${baseId}-container`}>
            <svg ref={ref} />
        </div>
    );
}
