import * as d3 from 'd3';
import { ColorsEnum } from 'common/theme';
import { CHARTCONFIGS, CHARTIDS } from '../../config';
import { DefaultDataProps } from '../../schema/schema';
import { returnChartAxis } from '../../BaseChart';
import {
    EditLiveMovePropTypes,
    TickerMetricStoreFormat,
    useChartStore,
} from 'store/chartview/chartview';

export const addLineTracker = (props: {
    ticker: string;
    baseId: string;
    tooltipId: string;
    data: DefaultDataProps; // The base data tracker
    metrics: TickerMetricStoreFormat[];
    setLiveMoves: (props: EditLiveMovePropTypes) => void;
    draw?: boolean;
}) => {
    const svg = d3.selectAll(`#${props.baseId}`);
    const draw = useChartStore.getState().charts[props.ticker].draw;

    const bisect = d3.bisector((d: any) => d).left;

    const nameWrapper = (name: string) => `${props.baseId}_${name}_${props.tooltipId}`;

    const groupClassname: string = nameWrapper(CHARTIDS.TOOLTIP_FOCUS_CLASS);
    const lineClassname: string = nameWrapper(CHARTIDS.TOOLTIP_LINE_CLASS);
    const mousetrackerClassname: string = nameWrapper(CHARTIDS.TOOLTIP_ENCOMPASSING_RECT_CLASS);

    const width: number = document.getElementById(props.baseId)!.parentNode!.parentElement!
        .clientWidth;
    const height: number = document.getElementById(props.baseId)!.parentNode!.parentElement!
        .clientHeight;

    const dates = props.data.dataX;

    const { x, y } = returnChartAxis({
        baseId: props.baseId,
        dataX: props.data.dataX,
        dataY: props.data.dataY,
        zeroAxis: false,
    });
    const focus = svg.append('g').attr('class', groupClassname);
    let mouseMoveTimeout: any;

    const trackerContainer = svg
        .append('rect')
        .attr('class', mousetrackerClassname)
        .style('fill', 'transparent')
        .style('pointer-events', 'all')
        .attr('width', width)
        .attr('height', height)
        .on('mouseover', mouseover)
        .on('mousedown', mousedown)
        .on('mousemove', mousemove)
        .on('mouseout', mouseout);

    focus
        .append('line')
        .attr('class', `${lineClassname}_y`)
        .style('stroke', ColorsEnum.white)
        .style('stroke-dasharray', '1,1')
        .style('stroke-width', CHARTCONFIGS.DEFAULT_LINE_STROKE_WIDTH)
        .style('opacity', 0.5)
        .attr('y1', 0)
        .attr('y2', height);

    focus
        .append('line')
        .attr('class', `${lineClassname}_x`)
        .style('stroke', ColorsEnum.white)
        .style('stroke-dasharray', '1,1')
        .style('stroke-width', CHARTCONFIGS.DEFAULT_LINE_STROKE_WIDTH)
        .style('opacity', 0.5)
        .attr('x1', 0)
        .attr('x2', width);

    function mousemove(event: MouseEvent) {
        const x0 = x.invert(d3.pointer(event, svg.node())[0]);
        const i = bisect(dates, x0, 1);
        focus.selectAll(`.${lineClassname}_y`).attr('transform', `translate(${x(dates[i])}, 0)`);
        focus
            .selectAll(`.${lineClassname}_x`)
            .attr('transform', `translate(0, ${y(props.data.dataY[i])})`);
        clearTimeout(mouseMoveTimeout);
        mouseMoveTimeout = setTimeout(() => {
            // To make calls more efficient, we add debounce
            // This sequence of hooks sets the prices for the cursor as it moves
            if (dates[i]) {
                props.setLiveMoves({
                    ticker: props.ticker,
                    metricId: 'price',
                    value: props.data.dataY[i],
                });
                props.setLiveMoves({
                    ticker: props.ticker,
                    metricId: 'date',
                    value: props.data.dataX[i],
                });
                if (props.metrics) {
                    props.metrics.map((entry: TickerMetricStoreFormat) => {
                        props.setLiveMoves({
                            ticker: props.ticker,
                            metricId: entry.metricId,
                            value: entry.value[i],
                        });
                    });
                }
            }
        }, 40);
    }
    // This counter maintains the number of lines drawn, and also the id of the most recent line
    let counter: number = 0;
    let startDraw: boolean = true;
    function mousedown(e: MouseEvent) {
        e.stopPropagation();
        e.stopImmediatePropagation();
        e.preventDefault();
        if (draw) {
            if (startDraw) {
                const m = d3.pointer(e);
                const line = svg
                    .append('line')
                    .attr('class', `${props.baseId}_${CHARTIDS.DRAW_LINE_CLASS}`)
                    .attr('id', counter)
                    .attr('x1', m[0] - 3)
                    .attr('y1', m[1] - 3)
                    .attr('x2', m[0] - 3)
                    .attr('y2', m[1] - 3)
                    .attr('stroke-width', 2)
                    .attr('stroke', ColorsEnum.royalred);
                trackerContainer.on('mousemove', (event: MouseEvent) => {
                    mousemove(event);
                    const m = d3.pointer(event);
                    line.attr('x2', m[0] - 3).attr('y2', m[1] - 3);
                });
                counter += 1;
            } else {
                trackerContainer.on('mousemove', (event: MouseEvent) => {
                    mousemove(event);
                });
            }
            // Swapping this allow us to disconnect the line when required.
            startDraw = !startDraw;
        }
    }

    function mouseover() {
        focus.style('opacity', 1);
    }

    function mouseout() {
        focus.style('opacity', 0);
    }
};
