import * as d3 from 'd3';
import * as React from 'react';

import { useD3 } from 'common/hooks/useD3';
import { useGeopoliticStore } from 'store/geopolitics/geopolitics';

/**
 * A generalised line chart, taking date as its x-axis and numerical value on its y-axis. Supports currently the following:
 * 1. Normalisation of y-axis
 * 2. Multiple line charts on the same axis
 * TAKE NOTE: dataX and dataY determines the boundaries of the x and y axis
 * @returns
 */
export default function Chloropleth(props: {
    baseId: string;
    geoData: any;
}): React.ReactElement {

    const setSelection = useGeopoliticStore(state => state.setSelection)

    const ref = useD3(
        (svg: d3.Selection<SVGElement, {}, HTMLElement, any>) => {
            if (!svg.selectAll('*').empty()) svg.selectAll('*').remove(); 

            const width = 720
            const height = 465
            // Map and projection
            svg.attr('viewBox', [
                0,
                0,
                width,
                height,
            ])
                .attr('preserveAspectRatio', 'xMidYMid meet')
                .classed('svg-content-responsive', true)
                .attr('stroke-width', 0);

            const path: any = d3.geoPath();
            const projection = d3
                .geoMercator()
                .fitSize([width, height], props.geoData);

            let data = new Map()
            let schemaBlues: any = d3.schemeBlues[7]

            const colorScale = d3.scaleThreshold()
            .domain([100000, 1000000, 10000000, 30000000, 100000000, 500000000])
            .range(schemaBlues);

            const mouseDown = (mouseEvent: React.MouseEvent, data: any) => {
                setSelection(data.id);
            }

            const mouseOver = (mouseEvent: React.MouseEvent, data: any) => {
                svg
                .selectAll('.country')
                .transition()
                .duration(200)
                .style('opacity', 0.5)
                .style('stroke', 'transparent')

                svg
                .select(`#country-${data.id}`)
                .transition()
                .duration(200)
                .style('opacity', 1)
                .style('stroke', 'transparent')
                .style('cursor', 'pointer')
            }

            const mouseLeave = (mouseEvent: React.MouseEvent) => {
                svg
                .selectAll('.country')
                .transition()
                .duration(200)
                .style('opacity', 1)
                .style('stroke', 'transparent')
                .style('cursor', 'pointer')
            }

            svg.append("g")
                .selectAll("path")
                .data(props.geoData.features)
                .enter()
                .append("path")
                .attr("d", path.projection(projection))
                // set the color of each country
                .attr("fill", function (d: any) {
                    d.total = data.get(d.id) || 0;
                    return colorScale(d.total);
                })
                .attr("class", "country")
                .attr("id", function (d: any) { return `country-${d.id}` })
                .on("mouseover", mouseOver)
                .on("mouseleave", mouseLeave)
                .on("mousedown", mouseDown);
        }, []
    );

    return (
        <div id={`${props.baseId}-container`} style={{ height: '100%', width: '100%' }}>
            <svg id={props.baseId} ref={ref} style={{ height: '100%', width: '100%' }} />
        </div>
    );
}


