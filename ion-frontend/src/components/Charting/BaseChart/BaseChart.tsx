import * as d3 from 'd3';
import * as React from 'react';
import * as C from './plugins';
import * as A from './actions';
import { LineChartProps } from './type';

import { useD3 } from 'common/hooks/useD3';
import { ColorsEnum } from 'common/theme';

import { CHARTCONFIGS, CHARTIDS } from './config';

function determineStartY(zeroAxis: boolean, minValue: number, maxValue: number) {
    const minBoundary = (maxValue - minValue) * 0.3;
    return zeroAxis && minBoundary > 3 ? 0 : minValue - minBoundary;
}

function determineEndY(minValue: number, maxValue: number) {
    const minBoundary = (maxValue - minValue) * 0.1;
    return maxValue + minBoundary;
}

function determineDatetimeFormat(startDate: Date, endDate: Date) {
    const timeDifference: number = Math.abs(endDate.getTime() - startDate.getTime()) / 1000;
    if (timeDifference <= 60 * 60) return '%H:%M';
    if (timeDifference <= 60 * 60 * 3) return '%d:%H';
    if (timeDifference <= 60 * 60 * 24 * 28) return '%m:%d';
    if (timeDifference <= 60 * 60 * 24 * 365) return '%Y:%m';
    else return '%Y';
}

export function returnChartAxis(props: {
    baseId: string;
    dataX: Date[];
    dataY: number[];
    zeroAxis: boolean;
}) {
    const dateTime: number[] = props.dataX.map((date: Date) => date.getTime());
    const width = document.getElementById(props.baseId)!.parentNode!.parentElement!.clientWidth;
    const height = document.getElementById(props.baseId)!.parentNode!.parentElement!.clientHeight;

    const minDate = Math.min(...dateTime);
    const maxDate = Math.max(...dateTime);
    const minValue = Math.min(...props.dataY);
    const maxValue = Math.max(...props.dataY);
    // Prep and plot the axis
    const x = d3.scaleTime().range([0, width]).domain([minDate, maxDate]);
    const y = d3
        .scaleLinear()
        .range([height, 0])
        .domain([
            determineStartY(props.zeroAxis, minValue, maxValue),
            determineEndY(minValue, maxValue),
        ]);
    return {
        x: x, 
        y: y,
    }
}
/**
 * A generalised line chart, taking date as its x-axis and numerical value on its y-axis. Supports currently the following:
 * 1. Normalisation of y-axis
 * 2. Multiple line charts on the same axis
 * TAKE NOTE: dataX and dataY determines the boundaries of the x and y axis
 * @returns
 */
export default function BaseChart({
    defaultData,
    baseId,
    strokeWidth = CHARTCONFIGS.DEFAULT_LINE_STROKE_WIDTH,
    zeroAxis = CHARTCONFIGS.DEFAULT_ZERO_AXIS,
    showLegend = CHARTCONFIGS.DEFAULT_SHOW_LEGEND,
    showPricing = CHARTCONFIGS.DEFAULT_SHOW_PRICING,
    showAverage = CHARTCONFIGS.DEFAULT_SHOW_AVERAGE,
    showGrid = CHARTCONFIGS.DEFAULT_SHOW_GRID,
    showAxis = CHARTCONFIGS.DEFAULT_SHOW_AXIS,
    showTooltip = CHARTCONFIGS.DEFAULT_SHOW_TOOLTIP,
}: LineChartProps): React.ReactElement {

    const ref = useD3(
        (svg: d3.Selection<SVGElement, {}, HTMLElement, any>) => {
            // Ensure rerender does not duplicate chart
            if (!svg.selectAll('*').empty()) svg.selectAll('*').remove(); // removes any overlapping versions of the svgs

            if (showLegend && showTooltip && showPricing) {
                throw new Error('Pick either show legend and tooltips or pricing only.');
            }

            CHARTCONFIGS.DEFAULT_LINE_STROKE_WIDTH =
                strokeWidth ?? CHARTCONFIGS.DEFAULT_LINE_STROKE_WIDTH;

            const dataX = defaultData.dataX;
            const dataY = defaultData.dataY;

            const width = document.getElementById(baseId)!.parentNode!.parentElement!.clientWidth;
            const height = document.getElementById(baseId)!.parentNode!.parentElement!.clientHeight;

            svg.attr('viewBox', [
                0,
                0,
                width + (showAxis ? 30 : 0), // Fixed sizing seems to work better than scaling with multiplication for showing of axis
                height + (showAxis ? 15 : 0),
            ])
                .attr('preserveAspectRatio', 'xMidYMid meet')
                .classed('svg-content-responsive', true)
                .attr('stroke-width', 0);
            
            const { x, y } = returnChartAxis({
                baseId: baseId, 
                dataX: dataX, 
                dataY: dataY, 
                zeroAxis: zeroAxis,
            });

            const yAxis = d3.axisRight(y).tickSize(width).ticks(0);

            const xAxis = d3
                .axisBottom(x)
                .tickFormat((date: Date | d3.NumberValue) => {
                    let dateItem: Date;
                    if (!(date instanceof Date)) {
                        dateItem = new Date(date as number);
                    } else {
                        dateItem = date;
                    }
                    return d3.timeFormat(determineDatetimeFormat(dataX[0], dataX[1]))(dateItem);
                })
                .tickSize(height)
                .ticks(0);

            if (showAxis) {
                // Set the number of ticks if we want to show the axis
                xAxis.ticks(10);
                yAxis.ticks(10);
            }

            svg.append('g')
                .attr('id', `${baseId}_${CHARTIDS.XAXIS_ID}`) // Sets a class name for our x axis
                .call(xAxis)
                .style('font-size', CHARTCONFIGS.DEFAULT_AXIS_FONTSIZE);

            svg.append('g')
                .attr('id', `${baseId}_${CHARTIDS.YAXIS_ID}`) // Set a class name for our y axis
                .call(yAxis)
                .style('font-size', CHARTCONFIGS.DEFAULT_AXIS_FONTSIZE);

            if (showAverage) {
                // A horizontal line that shows the average
                const mean = dataY.reduce((a: number, b: number) => a + b) / dataY.length;
                svg.append('line')
                    .attr('class', `${baseId}_${CHARTIDS.DRAW_LINE_CLASS}`)
                    .attr('x1', 1)
                    .attr('y1', y(mean))
                    .attr('x2', 1)
                    .attr('y2', y(mean))
                    .attr('stroke-width', CHARTCONFIGS.DEFAULT_LINE_STROKE_WIDTH)
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

            if (showTooltip) {
                C.addToolTip({
                    baseId: baseId,
                    tooltipId: baseId,
                    data: defaultData,
                });
            }

        },
        [defaultData]
    );

    return (
        <div id={`${baseId}-container`} style={{ height: '100%' }}>
            <svg ref={ref} id={baseId} style={{ height: '100%', width: '100%' }} />
        </div>
    );
}
