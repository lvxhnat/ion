import * as d3 from 'd3';
import * as React from 'react';
import * as C from './plugins';
import * as A from './actions';
import { LineChartProps } from './type';

import { useD3 } from 'common/hooks/useD3';
import { useThemeStore } from 'store/theme';
import { ColorsEnum } from 'common/theme';

import { LINECHARTCONFIGS, LINECHARTIDS } from './config';

/**
 * A generalised line chart, taking date as its x-axis and numerical value on its y-axis. Supports currently the following:
 * 1. Normalisation of y-axis
 * 2. Multiple line charts on the same axis
 * TAKE NOTE: dataX and dataY determines the boundaries of the x and y axis
 * @returns
 */
export default function BaseLineChart({
    defaultData,
    data = LINECHARTCONFIGS.DEFAULT_DATA,
    width = LINECHARTCONFIGS.DEFAULT_WIDTH,
    height = LINECHARTCONFIGS.DEFAULT_HEIGHT,
    margin = {
        top: LINECHARTCONFIGS.DEFAULT_MARGIN_TOP,
        right: LINECHARTCONFIGS.DEFAULT_MARGIN_RIGHT,
        bottom: LINECHARTCONFIGS.DEFAULT_MARGIN_BOTTOM,
        left: LINECHARTCONFIGS.DEFAULT_MARGIN_LEFT,
    },
    timeParseFormat = LINECHARTCONFIGS.DEFAULT_TIME_PARSE_FORMAT,
    showAverage = LINECHARTCONFIGS.DEFAULT_SHOW_AVERAGE,
    showGrid = LINECHARTCONFIGS.DEFAULT_SHOW_GRID,
    showAxis = LINECHARTCONFIGS.DEFAULT_SHOW_AXIS,
    showNormalised = LINECHARTCONFIGS.DEFAULT_SHOW_NORMALISED,
    showTooltip = LINECHARTCONFIGS.DEFAULT_SHOW_TOOLTIP,
}: LineChartProps): React.ReactElement {
    const { mode } = useThemeStore();

    const ref = useD3(
        (svg: d3.Selection<SVGElement, {}, HTMLElement, any>) => {
            // Ensure rerender does not duplicate chart
            if (!svg.selectAll('*').empty()) svg.selectAll('*').remove(); // set the dimensions and margins of the graph
            const dataX = defaultData.dataX;
            const dataY = defaultData.dataY;

            svg.attr('viewBox', [0, 0, width - margin.left - margin.right + 110, height + 15])
                .attr('preserveAspectRatio', 'xMidYMid meet')
                .classed('svg-content-responsive', true);

            // Parse the time in data
            const parseTime = d3.timeParse(timeParseFormat);
            const dates: Date[] = dataX.map((value: string) => {
                const val = parseTime(value);
                if (val !== null) return val;
                else
                    throw new Error(
                        'Value returned cannot be parsed to date in parseTime function'
                    );
            }); // Parse time should not return null
            const dateTime: number[] = dates.map((date: Date) => date.getTime());

            // Prep and plot the axis
            const x = d3.scaleTime().range([margin.left, width - margin.right]);
            const y = d3.scaleLinear().range([height - margin.top, margin.bottom]);

            x.domain([Math.min(...dateTime), Math.max(...dateTime)]);
            y.domain([0, Math.max(...dataY)]);

            const yAxis = d3
                .axisLeft(y)
                .tickSize(margin.left + margin.right - width)
                .ticks(0);

            const xAxis = d3
                .axisBottom(x)
                .tickSize(margin.bottom + margin.top - height)
                .ticks(0);

            A.addChart({
                x: x,
                y: y,
                type: defaultData.type,
                color: defaultData.color,
                id: defaultData.id,
                dataX: dates,
                dataY: dataY,
            });

            if (showAxis) {
                // Set the number of ticks if we want to show the axis
                xAxis.ticks(20);
                yAxis.ticks(10);
            }

            svg.append('g')
                .attr('transform', `translate(0,${height - margin.top})`)
                .attr('id', LINECHARTIDS.XAXIS_ID) // Sets a class name for our x axis
                .call(xAxis);

            svg.append('g')
                .attr('transform', `translate(${margin.left},0)`)
                .attr('id', LINECHARTIDS.YAXIS_ID) // Set a class name for our y axis
                .call(yAxis);

            if (showAverage) {
                // A horizontal line that shows the average
                const mean = dataY.reduce((a: number, b: number) => a + b) / dataY.length;
                svg.append('line')
                    .attr('class', LINECHARTIDS.DRAW_LINE_CLASS)
                    .attr('x1', margin.left)
                    .attr('y1', y(mean))
                    .attr('x2', width - margin.right)
                    .attr('y2', y(mean))
                    .attr('stroke-width', 2)
                    .attr('stroke-dasharray', '2,2')
                    .attr(
                        'stroke',
                        dataY[dataY.length - 1] > mean ? ColorsEnum.upHint : ColorsEnum.downHint
                    );
            }

            if (showGrid) {
                C.styleGrid();
            }

            C.addLegend({
                legend: [
                    {
                        name: defaultData.name,
                        id: defaultData.id,
                        color: defaultData.color,
                        parent: true,
                    },
                    { name: 'SMA 14D', id: 'b', color: 'yellow', parent: false },
                    { name: 'EMA 21D', id: 'c', color: 'green', parent: false },
                    { name: 'Bollinger Bands', id: 'd', color: 'blue', parent: false },
                    { name: 'e', id: 'e', color: 'pink', parent: false },
                ],
            });

            if (showTooltip) {
                C.addToolTip({
                    x,
                    y,
                    id: 'base',
                    dataX: dates,
                    dataY,
                    fontColor:
                        mode === 'dark'
                            ? LINECHARTCONFIGS.DEFAULT_DARKMODE_TOOLTIP_FONTCOLOR
                            : LINECHARTCONFIGS.DEFAULT_LIGHTMODE_TOOLTIP_FONTCOLOR,
                });
            }
        },
        [data]
    );

    return (
        <div id={LINECHARTIDS.BASE_CONTAINER_ID}>
            <svg ref={ref} id={LINECHARTIDS.BASE_SVG_ID}></svg>
        </div>
    );
}
