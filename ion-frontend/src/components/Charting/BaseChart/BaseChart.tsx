import * as d3 from 'd3';
import * as React from 'react';
import * as C from './plugins';
import * as A from './actions';
import { LineChartProps } from './type';
import { DefaultDataProps } from './schema/schema';

import { useD3 } from 'common/hooks/useD3';
import { ColorsEnum } from 'common/theme';

import { CHARTCONFIGS, CHARTIDS } from './config';
import { OHLCDataSchema } from 'data/schema/common';

function determineStartY(zeroAxis: boolean, minValue: number, maxValue: number) {
    const minBoundary = (maxValue - minValue) * 0.3;
    return zeroAxis && minBoundary > 3 ? 0 : minValue - minBoundary;
}

function determineEndY(minValue: number, maxValue: number) {
    const minBoundary = (maxValue - minValue) * 0.1;
    return maxValue + minBoundary;
}

function determineDatetimeFormat(startDate: Date, endDate: Date) {
    const timeDifference: number = Math.abs(endDate.getTime() - startDate.getTime())/1000
    if (timeDifference <= 60 * 60) return "%H:%M";
    if (timeDifference <= 60 * 60 * 3) return "%d:%H";
    if (timeDifference <= 60 * 60 * 24 * 28) return "%m:%d";
    if (timeDifference <= 60 * 60 * 24 * 365) return "%Y:%m";
    else return "%Y";
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
    data = CHARTCONFIGS.DEFAULT_DATA,
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
            
            const width = document.getElementById(baseId)!.parentNode!.parentElement!.clientWidth
            const height = document.getElementById(baseId)!.parentNode!.parentElement!.clientHeight 
            console.log(width, height)

            svg.attr('viewBox', [
                0,
                0,
                width * 1.03,
                height * 1,
            ])
                .attr('preserveAspectRatio', 'xMidYMid meet')
                .classed('svg-content-responsive', true)
                .attr('stroke-width', 0);

            const dateTime: number[] = dataX.map((date: Date) => date.getTime());

            // Prep and plot the axis
            const x = d3
                .scaleTime()
                .range([0, width]);
            const y = d3
                .scaleLinear()
                .range([height, 0]);

            const minDate = Math.min(...dateTime);
            const maxDate = Math.max(...dateTime);

            let dataYc: number[] = [];

            // if (dataY[0] !== null && typeof dataY[0] === 'object') {
            //     dataYc = (dataY as OHLCDataSchema[]).map((d: OHLCDataSchema) => d.high);
            // } else {
            //     dataYc = dataY as number[];
            // }
            const minValue = Math.min(...dataY);
            const maxValue = Math.max(...dataY);

            x.domain([minDate, maxDate]);
            y.domain([
                determineStartY(zeroAxis, minValue, maxValue),
                determineEndY(minValue, maxValue),
            ]);

            const yAxis = d3
                .axisRight(y)
                .tickSize(width)
                .ticks(0);

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
                .attr('transform', `translate(0, -10)`)
                .attr('id', `${baseId}_${CHARTIDS.XAXIS_ID}`) // Sets a class name for our x axis
                .call(xAxis)
                .style('font-size', CHARTCONFIGS.DEFAULT_AXIS_FONTSIZE)
                .style('stroke', 'white');

            svg.append('g')
                .attr('transform', `translate(${1},0)`)
                .attr('id', `${baseId}_${CHARTIDS.YAXIS_ID}`) // Set a class name for our y axis
                .call(yAxis)
                .style('font-size', CHARTCONFIGS.DEFAULT_AXIS_FONTSIZE);

            if (showAverage) {
                // A horizontal line that shows the average
                const mean =
                    dataY.reduce((a: number, b: number) => a + b) / dataYc.length;
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
                        dataYc[dataYc.length - 1] > mean ? ColorsEnum.upHint : ColorsEnum.downHint
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

            // if (showTooltip) {
            //     C.addToolTip({
            //         x: x,
            //         y: y,
            //         baseId: baseId,
            //         data: [defaultData, ...data],
            //     });
            // }
            if (showPricing) {
            }
        },
        [data.length, defaultData]
    );

    return (
        <div id={`${baseId}-container`} style={{ height: '100%' }}>
            <svg ref={ref} id={baseId} style={{ height: '100%', width: '100%' }}/>
        </div>
    );
}
