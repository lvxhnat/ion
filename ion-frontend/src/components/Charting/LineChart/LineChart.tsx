
import * as d3 from 'd3';
import * as React from 'react';
import * as C from './plugins'
import { LineChartProps } from './type';

import { useD3 } from 'common/hooks/useD3';
import { useThemeStore } from 'store/theme';
import { ColorsEnum } from 'common/theme';
import { calculateSMA } from './helpers/movingAverage';
import { Grid } from '@mui/material';
import CustomizedDialogs from './components/popup';

/**
 * A generalised line chart object, taking date as its x-axis and numerical value on its y-axis. Supports currently the following:
 * 1. Normalisation of y-axis
 * 2. Multiple line charts on the same axis
 * @returns 
 */
export default function LineChart({
    dataX,
    dataY,
    width = 960,
    height = 500,
    margin = { top: 10, right: 30, bottom: 20, left: 30 },
    timeParseFormat = "%Y-%m-%d",
    normaliseY = false,
    tooltipCrosshairs = false,
}: LineChartProps) {

    const { mode } = useThemeStore();

    const ref = useD3(
        (svg: d3.Selection<SVGElement, {}, HTMLElement, any>) => {
            // set the dimensions and margins of the graph
            const formattedWidth = width - margin.left - margin.right;
            const formattedHeight = height;
            // Configure the color palette of the charts
            const lineColor = mode === "light" ? ColorsEnum.black : ColorsEnum.white
            const fillColor = "steelblue"
            const fillOpacity = 0.6

            const defined = d3.map(dataY, (_, i) => !isNaN(dataY[i]));
            const indexes = d3.map(dataX, (_, i) => i); // Denotes simply an array containing index values

            svg.attr("viewBox", [0, 0, formattedWidth, formattedHeight])
                .attr("preserveAspectRatio", "xMidYMid meet")
                .classed("svg-content-responsive", true);

            // Parse the time in data
            var parseTime = d3.timeParse(timeParseFormat);
            const dates: Array<Date> = dataX.map((value: string) => parseTime(value)!); // Parse time should not return null
            const dateTime: Array<number> = dates.map((date: Date) => date.getTime());

            // Prep and plot the axis
            var x = d3.scaleTime().range([margin.left, width - margin.right]);
            var y = d3.scaleLinear().range([height - margin.top, margin.bottom]);

            x.domain([Math.min(...dateTime), Math.max(...dateTime)]);
            y.domain([0, Math.max(...dataY)]);

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

            C.styleGrid({
                svg,
                xAxis: ".xAxis",
                yAxis: ".yAxis"
            })

            // Calculate Area to fill the line chart
            var area: any = d3.area()
                .defined((_, i: number) => defined[i])
                .curve(d3.curveLinear)
                .x((_, i: number) => x(dates[i]))
                .y0(height - margin.top)
                .y1((_, i: number) => y(dataY[i]));

            // Calculate the Line for plotting
            var valueLine: any = d3.line()
                .defined((_, i: number) => defined[i])
                .x((_, i: number) => x(dates[i]))
                .y((_, i: number) => y(dataY[i]));

            svg.append("path")
                .attr("id", "base-line-area")
                .attr("fill", fillColor)
                .attr("opacity", fillOpacity)
                .attr("d", area(indexes.filter(i => defined[i])));

            svg.append("path")
                .attr("id", "base-line")
                .attr("fill", "none")
                .attr("stroke", lineColor)
                .attr("stroke-width", 1)
                .attr("d", valueLine(indexes.filter(i => defined[i])));

            const smas = calculateSMA(dataY, 14)
            C.addLine({ svg: svg, id: "sma14", x: x, y: y, indexes: indexes, dataX: dates, dataY: smas })

            C.addToolTip({
                x: x,
                y: y,
                svg: svg,
                dataX: dates,
                dataY: dataY,
                margin: margin,
                width: width,
                height: height,
                tooltipCrosshairs: tooltipCrosshairs,
            })

            // C.addDrag({
            //     x: x,
            //     y: y,
            //     svg: svg,
            // })
        },
        []
    );

    return (
        <Grid container>
            <Grid item xs={3}>
            </Grid>
            <Grid item xs={9}>
                <div id="linechart-svg-container">
                    <div id="linechart-tooltip" style={{ height: 20 }}></div>
                    <svg
                        ref={ref}
                        style={{
                            height: "100%",
                            width: "100%",
                            margin: "0px",
                        }}
                    >
                        <g className="plot-area" />
                        <g className="x-axis" />
                        <g className="y-axis" />
                    </svg>
                </div>
            </Grid>
        </Grid>
    );
}