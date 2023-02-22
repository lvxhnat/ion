import * as d3 from 'd3';
import * as d3_hexbin from 'd3-hexbin';
import * as React from 'react';

import { useD3 } from 'common/hooks/useD3';
import { ColorsEnum } from 'common/theme';
import MasterSearch from 'components/Navigation/MasterSearch';

interface HexLayerProps {
    baseId: string;
    theme: 'light' | 'dark';
    title?: string;
}

export default function HexLayer({ baseId, theme, title }: HexLayerProps): React.ReactElement {
    const ref = useD3(
        (svg: d3.Selection<SVGElement, {}, HTMLElement, any>) => {
            // Ensure rerender does not duplicate chart
            const width = 1200;
            const height = 100;
            const hexRadius = 7;

            // Generates all the x-coordinates required
            let data: [number, number][] = Array.from(
                { length: Math.floor(width / hexRadius) + 1 },
                (_, i) =>
                    // Generates all the y-coordinates required for the particular x-coordinate
                    Array.from({ length: Math.floor(height / hexRadius) + 1 }, (_, j) => [
                        i * hexRadius,
                        j * hexRadius,
                    ])
            ).flat() as [number, number][];

            // Initialise the canvas
            svg.attr('viewBox', [0, 0, width, height])
                .attr('preserveAspectRatio', 'xMidYMid meet')
                .classed('svg-content-responsive', true)
                .attr('stroke-width', 0);

            var x = d3.scaleLinear().domain([0, width]).range([0, width]);
            svg.append('g')
                .attr('transform', 'translate(0,' + height + ')')
                .call(d3.axisBottom(x));

            // Add Y axis
            var y = d3.scaleLinear().domain([5, 20]).range([height, 0]);
            svg.append('g').call(d3.axisLeft(y));

            // Compute the hexbin data
            var hexbin = d3_hexbin
                .hexbin()
                .radius(hexRadius) // size of the bin in px
                .extent([
                    [0, 0],
                    [width, height],
                ]);

            // Plot the hexbins
            svg.append('clipPath')
                .attr('id', 'clip')
                .append('rect')
                .attr('width', width)
                .attr('height', height);

            svg.append('g')
                .attr('clip-path', 'url(#clip)')
                .selectAll('path')
                .data(hexbin(data))
                .enter()
                .append('path')
                .attr('d', hexbin.hexagon())
                .attr('transform', function (d: any) {
                    return 'translate(' + d.x + ',' + d.y + ')';
                })
                .attr('fill', function (_: any) {
                    return theme === 'light'
                        ? Math.random() > 0.3
                            ? ColorsEnum.limeGreen
                            : ColorsEnum.lightLime
                        : Math.random() > 0.3
                        ? ColorsEnum.economicBlue
                        : ColorsEnum.geekBlue;
                })
                .attr('stroke', function (_: any) {
                    return theme === 'dark' ? ColorsEnum.black : ColorsEnum.white;
                })
                .attr('stroke-width', theme === 'light' ? 1 : 0.3);

            if (title) {
                svg.append('text')
                    .attr('x', width / 2)
                    .attr('y', height / 2)
                    .attr('dy', -20)
                    .text(title)
                    .style('text-anchor', 'middle')
                    .style('font-weight', 'bold')
                    .style('font-size', 'calc(12px + 0.2vw)')
                    .style('fill', theme === 'dark' ? ColorsEnum.white : ColorsEnum.black);
            }
        },
        [theme]
    );

    return (
        <div id={`${baseId}-container`}>
            <svg ref={ref} />
            <div
                style={{
                    position: 'absolute',
                    marginTop: -60,
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <MasterSearch />
            </div>
        </div>
    );
}
