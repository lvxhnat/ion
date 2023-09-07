import * as d3 from 'd3';
import * as React from 'react';

import { addChart } from './actions';
import { LineChartProps } from './type';
import { addLineTracker, styleGrid } from './plugins';

import { useD3 } from 'common/hooks/useD3';
import { ColorsEnum } from 'common/theme';

import { CHARTCONFIGS, CHARTIDS } from './config';
import { useBaseChartStore } from 'store/chartview/basechart';

const determineDatetimeFormat = (
    startDate: Date,
    endDate: Date,
    count: number,
    numTicks: number
) => {
    const timeDifference: number =
        ((count / numTicks) * Math.abs(endDate.getTime() - startDate.getTime())) / 1000;
    let format: string = '%Y';
    if (timeDifference >= 60 * 60 * 24 * 300) format = '%b %Y';
    else if (timeDifference >= 60 * 60 * 24 * 21) format = '%d %b %Y';
    else if (timeDifference >= 60 * 60) format = '%d %b %H:%M';
    else format = '%M:%S';
    return format;
};

export const determineNumericalFormat = (value: number): string => {
    let prefix: number = value;
    let suffix: string = '';
    if (Math.abs(value) >= 1_000_000_000) {
        prefix = value / 1_000_000_000;
        suffix = 'B';
    } else if (Math.abs(value) >= 1_000_000) {
        prefix = value / 1_000_000;
        suffix = 'M';
    } else if (Math.abs(value) >= 1_000) {
        prefix = value / 1_000;
        suffix = 'K';
    }
    if (prefix - Math.floor(prefix) !== 0) {
        return `${prefix.toFixed(2)}${suffix}`;
    }
    return `${prefix}${suffix}`;
};

/**
 * Determines and returns the axis objects depending on if axis needs to be normalised.
 * @param props
 * @returns
 */
export function returnChartAxis(props: {
    width: number;
    height: number;
    baseId: string;
    dataX: Date[];
    dataY: number[];
    zeroAxis?: boolean;
    normalise?: boolean;
}): {
    x: d3.ScaleTime<number, number, never>;
    y: d3.ScaleLinear<number, number, never>;
} {
    // Determine the X-Axis
    const dateTime: number[] = props.dataX.map((date: Date) => date.getTime());
    const minDate = Math.min(...dateTime);
    const maxDate = Math.max(...dateTime);
    const x = d3.scaleTime().range([0, props.width]).domain([minDate, maxDate]);

    // Determine the Y-Axis
    let yStart = -0.01,
        yEnd = 1.01;
    if (!props.normalise) {
        const minValue = Math.min(...props.dataY);
        const maxValue = Math.max(...props.dataY);
        // Adds padding to yAxis so the graph does not appear cut off
        const startBoundary = (maxValue - minValue) * 0.3;
        yStart = props.zeroAxis && startBoundary > 3 ? 0 : minValue - startBoundary;
        const endBoundary = (maxValue - minValue) * 0.1;
        yEnd = maxValue + endBoundary;
    }

    const y = d3
        .scaleLinear()
        .range([props.height - CHARTCONFIGS.DEFAULT_MARGIN.BOTTOM, CHARTCONFIGS.DEFAULT_MARGIN.TOP])
        .domain([yStart, yEnd]);

    return {
        x: x,
        y: y,
    };
}

/**
 * A generalised line chart, taking date as its x-axis and numerical value on its y-axis. Supports currently the following:
 * 1. Normalisation of y-axis
 * 2. Multiple line charts on the same axis
 * TAKE NOTE: dataX and dataY determines the boundaries of the x and y axis
 * @returns
 */
export default function BaseChart(props: LineChartProps): React.ReactElement {
    const numTicks: number = 10;
    const ticker: string = props.baseId.split('__')[0];

    const setBaseChartConfigs = useBaseChartStore(state => state.setChartConfigs);

    const ref = useD3(
        (svg: d3.Selection<SVGElement, {}, HTMLElement, any>) => {
            // Ensure rerender does not duplicate chart
            if (!svg.selectAll('*').empty()) svg.selectAll('*').remove(); // removes any overlapping versions of the svgs
            if (props.showLegend && props.showTooltip)
                throw new Error('Pick either show legend and tooltips or pricing only.');

            CHARTCONFIGS.DEFAULT_LINE_STROKE_WIDTH =
                props.strokeWidth ?? CHARTCONFIGS.DEFAULT_LINE_STROKE_WIDTH;

            let dataX = props.defaultData.dataX.map(date => new Date(date));
            let dataY = props.defaultData.dataY;

            const width = document.getElementById(props.baseId)!.parentElement!.clientWidth;
            const height = document.getElementById(props.baseId)!.parentElement!.clientHeight;

            svg.attr('viewBox', [
                0,
                0,
                width + (props.showAxis ? 30 : 0), // Fixed sizing seems to work better than scaling with multiplication for showing of axis
                height + (props.showAxis ? 10 : 0),
            ])
                .attr('preserveAspectRatio', 'xMidYMid meet')
                .classed('svg-content-responsive', true)
                .attr('stroke-width', 0);

            const { x, y } = returnChartAxis({
                width: width,
                height: height,
                baseId: props.baseId,
                dataX: dataX,
                dataY: dataY,
                normalise: props.normalise,
                zeroAxis: props.zeroAxis,
            });

            const yAxis = d3
                .axisRight(y)
                .tickFormat((value: d3.NumberValue) => determineNumericalFormat(value as number))
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
                    return d3.timeFormat(
                        determineDatetimeFormat(dataX[0], dataX[1], dataX.length, numTicks)
                    )(dateItem);
                })
                .tickSize(height)
                .ticks(0);

            if (props.showAxis) {
                // Set the number of ticks if we want to show the axis
                xAxis.ticks(numTicks);
                yAxis.ticks(numTicks);
            }

            svg.append('g')
                .attr('id', `${props.baseId}_${CHARTIDS.XAXIS_ID}`) // Sets a class name for our x axis
                .call(xAxis)
                .style('font-size', CHARTCONFIGS.DEFAULT_AXIS_FONTSIZE);

            svg.append('g')
                .attr('id', `${props.baseId}_${CHARTIDS.YAXIS_ID}`) // Set a class name for our y axis
                .call(yAxis)
                .style('font-size', CHARTCONFIGS.DEFAULT_AXIS_FONTSIZE);

            if (props.showAverage) {
                // A horizontal line that shows the average
                const mean = dataY.reduce((a: number, b: number) => a + b) / dataY.length;
                svg.append('line')
                    .attr('class', `${props.baseId}_${CHARTIDS.DRAW_LINE_CLASS}`)
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

            if (props.showGrid) {
                styleGrid({
                    baseId: props.baseId,
                });
            }

            addChart({
                x: x,
                y: y,
                id: props.defaultData.id,
                baseId: props.baseId,
                type: 'line',
                color: 'white',
                dataX: dataX,
                dataY: dataY,
                normalise: props.normalise,
                showEndTags: props.showEndTags,
            });

            setBaseChartConfigs({
                ticker: ticker,
                configs: {
                    x: x,
                    y: y,
                    dataX: dataX,
                    color: 'white',
                    type: 'line',
                    plots: [],
                },
            });

            if (props.showTooltip) {
                addLineTracker({
                    x: x,
                    y: y,
                    ticker: ticker,
                    baseId: props.baseId,
                    metrics: [],
                    normalise: props.normalise,
                });
            }
        },
        [props.defaultData]
    );

    return (
        <div
            id={`${props.baseId}-container`}
            style={{
                height: '100%',
                width: '100%',
                border: props.showAxis ? `1px solid ${ColorsEnum.warmgray1}` : 'none',
                padding: props.showAxis ? 5 : 0,
            }}
        >
            <svg ref={ref} id={props.baseId} style={{ height: '100%', width: '100%' }} />
        </div>
    );
}
