
import * as d3 from 'd3';
import * as React from 'react';
import * as C from './plugins';
import { LineChartProps } from './type';

import { useD3 } from 'common/hooks/useD3';
import { useThemeStore } from 'store/theme';
import { ColorsEnum } from 'common/theme';
import { calculateSMA } from './helpers/movingAverage';

import { LINECHARTCONFIGS, LINECHARTIDS } from './config';

/**
 * A generalised line chart, taking date as its x-axis and numerical value on its y-axis. Supports currently the following:
 * 1. Normalisation of y-axis
 * 2. Multiple line charts on the same axis
 * @returns 
 */
export default function BaseLineChart({
    dataX,
    dataY,
    width = LINECHARTCONFIGS.DEFAULT_WIDTH,
    height = LINECHARTCONFIGS.DEFAULT_HEIGHT,
    margin = { top: LINECHARTCONFIGS.DEFAULT_MARGIN_TOP, right: LINECHARTCONFIGS.DEFAULT_MARGIN_RIGHT, bottom: LINECHARTCONFIGS.DEFAULT_MARGIN_BOTTOM, left: LINECHARTCONFIGS.DEFAULT_MARGIN_LEFT },
    timeParseFormat = LINECHARTCONFIGS.DEFAULT_TIME_PARSE_FORMAT,
    showAverage = LINECHARTCONFIGS.DEFAULT_SHOW_AVERAGE,
    showGrid = LINECHARTCONFIGS.DEFAULT_SHOW_GRID,
    showAxis = LINECHARTCONFIGS.DEFAULT_SHOW_AXIS,
    showArea = LINECHARTCONFIGS.DEFAULT_SHOW_LINE_AREA,
    showNormalised = LINECHARTCONFIGS.DEFAULT_SHOW_NORMALISED,
    showTooltip = LINECHARTCONFIGS.DEFAULT_SHOW_TOOLTIP,
}: LineChartProps) {

    const { mode } = useThemeStore();

    const ref = useD3(
        (svg: d3.Selection<SVGElement, {}, HTMLElement, any>) => {
            // Ensure rerender does not duplicate chart
            if (!svg.selectAll('*').empty()) svg.selectAll('*').remove();
            // set the dimensions and margins of the graph
            const formattedWidth = width - margin.left - margin.right;
            const formattedHeight = height;
            // Configure the color palette of the charts
            const lineColor = mode === "dark" ? LINECHARTCONFIGS.DEFAULT_DARKMODE_LINE_COLOR : LINECHARTCONFIGS.DEFAULT_LIGHTMODE_LINE_COLOR;
            const fillColor = LINECHARTCONFIGS.DEFAULT_LINE_AREA_COLOR;
            const fillOpacity = LINECHARTCONFIGS.DEFAULT_LINE_AREA_OPACITY;

            const defined = d3.map(dataY, (_, i) => !isNaN(dataY[i]));
            const indexes = d3.map(dataX, (_, i) => i); // Denotes simply an array containing index values

            svg.attr("viewBox", [0, 0, formattedWidth + 110, formattedHeight + 15])
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
                .ticks(0);

            const xAxis = d3.axisBottom(x)
                .tickSize(margin.bottom + margin.top - height)
                .ticks(0);

            if (showAxis) { // Set the number of ticks if we want to show the axis
                xAxis.ticks(20);
                yAxis.ticks(10);
            }

            svg.append("g")
                .attr("transform", "translate(0," + (height - margin.top) + ")")
                .attr("id", "xAxis") // Sets a class name for our x axis
                .call(xAxis)

            svg.append("g")
                .attr("transform", "translate(" + (margin.left) + ",0)")
                .attr("id", "yAxis") // Set a class name for our y axis
                .call(yAxis)

            if (showAverage) { // A horizontal line that shows the average
                const mean = dataY.reduce((a: number, b: number) => a + b) / dataY.length;
                svg.append("line")
                    .attr("class", "drawLine")
                    .attr("x1", margin.left)
                    .attr("y1", y(mean))
                    .attr("x2", width - margin.right)
                    .attr("y2", y(mean))
                    .attr("stroke-width", 2)
                    .attr("stroke-dasharray", "2,2")
                    .attr("stroke", dataY[dataY.length - 1] > mean ? ColorsEnum.upHint : ColorsEnum.downHint);
            }

            // Calculate the Line for plotting
            var valueLine: any = d3.line()
                .defined((_, i: number) => defined[i])
                .x((_, i: number) => x(dates[i]))
                .y((_, i: number) => y(dataY[i]));

            svg.append("path")
                .attr("id", "base-line")
                .attr("fill", "none")
                .attr("stroke", lineColor)
                .attr("stroke-width", 1)
                .attr("d", valueLine(indexes.filter(i => defined[i])));

            // svg.append("div")
            //     .attr("class", "tag")
            //     .attr("id", "base-line-tag")
            //     .attr("width", 0)
            //     .attr("height", 0)
            //     .attr("border-top", "60px transparent")
            //     .attr("border-bottom", "60px transparent")
            //     .attr("border-left", "60px transparent")
            //     .attr("transform", "translate(" + (width) + ",0)")


            if (showGrid) {
                C.styleGrid()
            }

            // Calculate Area to fill the line chart
            if (showArea) {
                let area: any = d3.area()
                    .defined((_, i: number) => defined[i])
                    .curve(d3.curveLinear)
                    .x((_, i: number) => x(dates[i]))
                    .y0(height - margin.top)
                    .y1((_, i: number) => y(dataY[i]));

                svg.append("path")
                    .attr("id", "base-line-area")
                    .attr("fill", fillColor)
                    .attr("opacity", fillOpacity)
                    .attr("d", area(indexes.filter(i => defined[i])));
            }

            C.addLegend({
                legend: [
                    { name: "EUR-USD Spot Price is cool stuff", id: "eur_usd_spot", color: "red", parent: true },
                    { name: "b", id: "b", color: "yellow", parent: false },
                    { name: "c", id: "c", color: "green", parent: false },
                    { name: "d", id: "d", color: "blue", parent: false },
                    { name: "e", id: "e", color: "pink", parent: false },
                    { name: "USD-SGD Spot Price is cool stuff", id: "usd_sgd_spot", color: "red", parent: true },
                ]
            })
            C.addEndTags({ y: y, dataY: [dataY[dataY.length - 1]] })
            // svg.append("rect")
            //     .attr("width", "25px")
            //     .attr("height", "12px")
            //     .attr("fill", "red")
            //     .attr("transform", `translate(${formattedWidth - margin.left},${y(dataY[dataY.length - 1] + margin.bottom)})`)
            //     .append("path")
            //     .attr("d", function (d) { return d3.symbol().type(d3.symbolTriangle).size(200)(); })
            //     .attr("transform", `translate(${formattedWidth - margin.left},${y(dataY[dataY.length - 1] + margin.bottom)})`)

            // const smas = calculateSMA(dataY, 14)
            // C.addLine({ svg: svg, id: "sma14", x: x, y: y, indexes: indexes, dataX: dates, dataY: smas })

            if (showTooltip) {
                C.addToolTip({
                    x: x,
                    y: y,
                    dataX: dates,
                    dataY: dataY,
                    fontColor: mode === "dark" ? LINECHARTCONFIGS.DEFAULT_DARKMODE_TOOLTIP_FONTCOLOR : LINECHARTCONFIGS.DEFAULT_LIGHTMODE_TOOLTIP_FONTCOLOR,
                })
            }

        },
        []
    );


    return (
        <div id={LINECHARTIDS.BASE_CONTAINER_ID}>
            <svg ref={ref} id={LINECHARTIDS.BASE_SVG_ID}>
            </svg>
        </div>
    );
}