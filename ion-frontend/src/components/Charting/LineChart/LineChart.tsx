
import * as d3 from 'd3';
import * as React from 'react';
import * as S from './helpers/style';
import * as T from './helpers/tooltip'

import { useD3 } from 'common/hooks/useD3';
import { useThemeStore } from 'store/theme';
import { ColorsEnum } from 'common/theme';

export type LineChartProps = {
    data: Array<{ date: string, value: number }>,
    width?: number,
    height?: number,
    margin?: {
        top: number
        bottom: number
        left: number
        right: number
    },
    timeParseFormat?: string,
    normaliseY?: boolean,
}

/**
 * A generalised line chart object, taking date as its x-axis and numerical value on its y-axis. Supports currently the following:
 * 1. Normalisation of y-axis
 * 2. Multiple line charts on the same axis
 * @returns 
 */
export default function LineChart({
    data,
    width = 960,
    height = 500,
    margin = { top: 20, right: 50, bottom: 50, left: 50 },
    timeParseFormat = "%Y-%m-%d",
    normaliseY = false,
}: LineChartProps) {

    const { mode } = useThemeStore();

    const ref = useD3(
        (svg: d3.Selection<SVGElement, {}, HTMLElement, any>) => {

            // set the dimensions and margins of the graph
            const formattedWidth = width - margin.left - margin.right;
            const formattedHeight = height;

            // time format to parse passed date props

            // Configure the color palette of the charts
            const lineColor = mode === "light" ? ColorsEnum.black : ColorsEnum.white
            const fillColor = "steelblue"
            const fillOpacity = 0.6

            /**
             * Configure the svg container to be responsive
             * @see See [StackOverflow](https://stackoverflow.com/questions/9400615/whats-the-best-way-to-make-a-d3-js-visualisation-layout-responsive)
             */
            svg.attr("viewBox", [0, 0, formattedWidth, formattedHeight])
                .attr("preserveAspectRatio", "xMidYMid meet")
                .classed("svg-content-responsive", true);

            // Parse the time in data
            var parseTime = d3.timeParse(timeParseFormat);
            data.map((d: any) => { d.date = parseTime(d.date); d.value = +d.value });

            // Prep and plot the axis
            var x = d3.scaleTime().range([margin.left, width - margin.right]);
            var y = d3.scaleLinear().range([height - margin.top, margin.bottom]);

            const dates = data.map((d: any) => { return d.date; })
            x.domain([Math.min(...dates), Math.max(...dates)]);
            y.domain([0, d3.max(data, (d: any) => { return d.value; })]);

            const yAxis = d3.axisLeft(y)
                .tickSize(margin.left + margin.right - width)
                .ticks(10);

            const xAxis = d3.axisBottom(x)
                .tickSize(margin.bottom + margin.top - height)
                .ticks(10)

            svg.append("g")
                .attr("transform", "translate(0," + (height - margin.top) + ")")
                .attr("class", "xAxis") // Sets a class name for our x axis
                .call(xAxis)

            svg.append("g")
                .attr("transform", "translate(" + (margin.left) + ",0)")
                .attr("class", "yAxis") // Set a class name for our y axis
                .call(yAxis)

            svg = S.styleLineGrid({ svg, xAxis: ".xAxis", yAxis: ".yAxis" })

            // Calculate Area to fill the line chart
            var area: any = d3.area()
                .x(function (d: any) { return x(d.date); })
                .y0(height - margin.top)
                .y1(function (d: any) { return y(d.value); });

            // Calculate the Line for plotting
            var valueLine: any = d3.line()
                .x((d: any) => { return x(d.date); })
                .y((d: any) => { return y(d.value); });

            svg.append("path")
                .data([data])
                .attr("class", "area")
                .attr("fill", fillColor)
                .attr("opacity", fillOpacity)
                .attr("d", area);

            svg.append("path")
                .data([data])
                .attr("class", "line")
                .attr("fill", "none")
                .attr("stroke", lineColor)
                .attr("stroke-width", 1)
                .attr("d", valueLine);

            T.createToolTip({
                svg: svg,
                x: x,
                y: y,
                data: data,
                width: width,
                height: height,
                margin: margin,
                timeParseFormat: timeParseFormat,
                normaliseY: normaliseY,
            })
        },
        [data.length]
    );

    return (
        <svg
            ref={ref}
            style={{
                height: 500,
                width: "100%",
                marginRight: "0px",
                marginLeft: "0px",
            }}
        >
            <g className="plot-area" />
            <g className="x-axis" />
            <g className="y-axis" />
        </svg>
    );
}