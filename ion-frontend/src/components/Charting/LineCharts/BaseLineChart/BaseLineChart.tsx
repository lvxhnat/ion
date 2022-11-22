import * as d3 from 'd3';
import * as React from 'react';
import * as C from './plugins';
import * as A from './actions';
import { DefaultDataProps, LineChartProps } from './type';

import { useD3 } from 'common/hooks/useD3';
import { ColorsEnum } from 'common/theme';

import { LINECHARTCONFIGS, LINECHARTIDS } from './config';

function determineStartY(zeroAxis: boolean, minValue: number, maxValue: number) {
    const minBoundary = (maxValue - minValue) * 0.3;
    return zeroAxis && minBoundary > 3 ? 0 : minValue - minBoundary;
}

function determineEndY(minValue: number, maxValue: number) {
    const minBoundary = (maxValue - minValue) * 0.1;
    return maxValue + minBoundary;
}

/**
 * A generalised line chart, taking date as its x-axis and numerical value on its y-axis. Supports currently the following:
 * 1. Normalisation of y-axis
 * 2. Multiple line charts on the same axis
 * TAKE NOTE: dataX and dataY determines the boundaries of the x and y axis
 * @returns
 */
export default function BaseLineChart({
    defaultData,
    baseId,
    data = LINECHARTCONFIGS.DEFAULT_DATA,
    width = LINECHARTCONFIGS.DEFAULT_WIDTH,
    height = LINECHARTCONFIGS.DEFAULT_HEIGHT,
    margin = {
        top: LINECHARTCONFIGS.DEFAULT_MARGIN_TOP,
        right: LINECHARTCONFIGS.DEFAULT_MARGIN_RIGHT,
        bottom: LINECHARTCONFIGS.DEFAULT_MARGIN_BOTTOM,
        left: LINECHARTCONFIGS.DEFAULT_MARGIN_LEFT,
    },
    zeroAxis = LINECHARTCONFIGS.DEFAULT_ZERO_AXIS,
    showLegend = LINECHARTCONFIGS.DEFAULT_SHOW_LEGEND,
    showAverage = LINECHARTCONFIGS.DEFAULT_SHOW_AVERAGE,
    showGrid = LINECHARTCONFIGS.DEFAULT_SHOW_GRID,
    showAxis = LINECHARTCONFIGS.DEFAULT_SHOW_AXIS,
    showNormalised = LINECHARTCONFIGS.DEFAULT_SHOW_NORMALISED,
    showTooltip = LINECHARTCONFIGS.DEFAULT_SHOW_TOOLTIP,
}: LineChartProps): React.ReactElement {
    const ref = useD3(
        (svg: d3.Selection<SVGElement, {}, HTMLElement, any>) => {
            // Ensure rerender does not duplicate chart
            if (!svg.selectAll('*').empty()) svg.selectAll('*').remove(); // removes any overlapping versions of the svgs

            const dataX = defaultData.dataX;
            const dataY = defaultData.dataY;

            svg.attr('viewBox', [
                0,
                0,
                width + margin.right + margin.left,
                height + margin.top * 1.5,
            ])
                .attr('preserveAspectRatio', 'xMidYMid meet')
                .classed('svg-content-responsive', true)
                .attr('stroke-width', 0);

            const dateTime: number[] = dataX.map((date: Date) => date.getTime());

            // Prep and plot the axis
            const x = d3.scaleTime().range([margin.left, width - margin.right]);
            const y = d3.scaleLinear().range([height - margin.top, margin.bottom]);

            const minDate = Math.min(...dateTime);
            const maxDate = Math.max(...dateTime);
            const minValue = Math.min(...dataY);
            const maxValue = Math.max(...dataY);

            x.domain([minDate, maxDate]);
            y.domain([
                determineStartY(zeroAxis, minValue, maxValue),
                determineEndY(minValue, maxValue),
            ]);

            const yAxis = d3
                .axisLeft(y)
                .tickSize(margin.left + margin.right - width)
                .ticks(0);

            const xAxis = d3
                .axisBottom(x)
                .tickFormat((_: Date | d3.NumberValue, index: number) => {
                    const date = new Date(dataX[index]);
                    if (maxDate - minDate <= 86400000) {
                        // Check if the time period is less than a day
                        return `${date.getHours()}:${date.getMinutes()}`;
                    } else {
                        return `${date.getMonth()}/${date.getDay()}`;
                    }
                })
                .tickSize(margin.bottom + margin.top - height)
                .ticks(0);

            if (showAxis) {
                // Set the number of ticks if we want to show the axis
                xAxis.ticks(5);
                yAxis.ticks(10);
            }

            svg.append('g')
                .attr('transform', `translate(0,${height - margin.top})`)
                .attr('id', `${baseId}_${LINECHARTIDS.XAXIS_ID}`) // Sets a class name for our x axis
                .call(xAxis);

            svg.append('g')
                .attr('transform', `translate(${margin.left},0)`)
                .attr('id', `${baseId}_${LINECHARTIDS.YAXIS_ID}`) // Set a class name for our y axis
                .call(yAxis);

            if (showAverage) {
                // A horizontal line that shows the average
                const mean = dataY.reduce((a: number, b: number) => a + b) / dataY.length;
                svg.append('line')
                    .attr('class', `${baseId}_${LINECHARTIDS.DRAW_LINE_CLASS}`)
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
                C.styleGrid({
                    baseId: baseId,
                });
            }

            A.addChart({
                x: x,
                y: y,
                baseId: baseId,
                type: defaultData.type,
                color: defaultData.color,
                id: defaultData.id,
                dataX: dataX,
                dataY: dataY,
            });

            data.map((d: DefaultDataProps) => {
                A.addChart({
                    x: x,
                    y: y,
                    baseId: baseId,
                    type: d.type,
                    color: d.color,
                    id: d.id,
                    dataX: d.dataX,
                    dataY: d.dataY,
                });
            });

            if (showLegend) {
                C.addLegend({
                    baseId: baseId,
                    legend: [defaultData, ...data],
                });
            }

            if (showTooltip) {
                C.addToolTip({
                    x: x,
                    y: y,
                    baseId: baseId,
                    data: [defaultData, ...data],
                });
            }
        },
        [data.length]
    );

    return (
        <div id={`${baseId}-container`}>
            <svg ref={ref} id={baseId} />
        </div>
    );
}
