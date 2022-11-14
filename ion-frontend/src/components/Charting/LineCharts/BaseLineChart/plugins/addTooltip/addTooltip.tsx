import * as d3 from 'd3';
import { ColorsEnum } from 'common/theme';
import { LINECHARTCONFIGS, LINECHARTIDS } from '../../config';
import { DataProps } from '../../type';

function formatDateString(d: Date) {
    const zeroPad = (n: number) => `${`0${n + 1}`.slice(-2)}`;
    return `${zeroPad(d.getDate())}/${zeroPad(d.getMonth())}/${d.getFullYear()} ${zeroPad(
        d.getHours()
    )}:${zeroPad(d.getMinutes())}`;
}

export const addToolTip = (props: { x: any; y: any; baseId: string; data: DataProps }) => {
    const svg = d3.selectAll(`#${props.baseId} `);
    const dates = props.data[0].dataX;
    const bisect = d3.bisector((d: any) => d).left;

    const focus = svg
        .append('g')
        .attr('class', `${props.baseId}_${LINECHARTIDS.TOOLTIP_FOCUS_CLASS}`)
        .style('opacity', 0);

    // Create the text that travels along the curve of chart
    const tooltips = d3.selectAll(`.${props.baseId}_${LINECHARTIDS.LEGEND_VALUE_CLASS}`);

    // append the circle at the intersection
    focus
        .selectAll(`.${props.baseId}_${LINECHARTIDS.TOOLTIP_CIRCLE_TRACKER_CLASS}`)
        .data(props.data)
        .enter()
        .append('g')
        .attr('class', `${props.baseId}_${LINECHARTIDS.TOOLTIP_CIRCLE_TRACKER_CLASS}`)
        .append('circle')
        .attr('id', d => `${props.baseId}_${d.id}`)
        .style('fill', 'none')
        .style('stroke', d => ColorsEnum.white)
        .style('stroke-width', 1)
        .attr('r', 4);

    if (d3.selectAll(`.${props.baseId}_${LINECHARTIDS.TOOLTIP_RECT_TRACKER_CLASS}`).empty()) {
        // Append the rectangle that will contain the text at the bottom of the chart
        focus
            .append('rect')
            .attr('class', `${props.baseId}_${LINECHARTIDS.TOOLTIP_RECT_TRACKER_CLASS}`)
            .style('fill', ColorsEnum.white)
            .attr('width', 80)
            .attr('height', 20)
            .attr('transform', `translate(${LINECHARTCONFIGS.DEFAULT_MARGIN_LEFT}, 0)`);
        // Append text to the bottom of the chart
        focus
            .append('text')
            .attr('class', `${props.baseId}_${LINECHARTIDS.TOOLTIP_RECT_TEXT_CLASS}`)
            .attr('font-size', '10px')
            .attr('transform', `translate(${LINECHARTCONFIGS.DEFAULT_MARGIN_LEFT}, 0)`);
        // Add the vertical line that tracks all the data points
        focus
            .append('line')
            .attr('class', `${props.baseId}_${LINECHARTIDS.TOOLTIP_LINE_CLASS}`)
            .style('stroke', ColorsEnum.white)
            .style('stroke-dasharray', '3,3')
            .style('stroke-width', 1)
            .style('opacity', 0.5)
            .attr('y1', LINECHARTCONFIGS.DEFAULT_MARGIN_BOTTOM)
            .attr('y2', LINECHARTCONFIGS.DEFAULT_HEIGHT - LINECHARTCONFIGS.DEFAULT_MARGIN_TOP);
        // Create a rect on top of the svg area: this rectangle recovers mouse position
        svg.append('rect')
            .attr('class', `${props.baseId}_${LINECHARTIDS.TOOLTIP_ENCOMPASSING_RECT_CLASS}`)
            .style('fill', 'none')
            .style('pointer-events', 'all')
            .attr('width', LINECHARTCONFIGS.DEFAULT_WIDTH - LINECHARTCONFIGS.DEFAULT_MARGIN_LEFT)
            .attr('height', LINECHARTCONFIGS.DEFAULT_HEIGHT)
            .on('mouseover', mouseover)
            .on('mousemove', mousemove)
            .on('mouseout', mouseout);
    }

    function mouseover() {
        focus.style('opacity', 1);
    }

    function mousemove(e: any) {
        // https://stackoverflow.com/questions/68156231/d3-x-invert-returning-invalid-date-from-d3-pointer-d3-v6
        const x0 = props.x.invert(d3.pointer(e, svg.node())[0]);
        const i = bisect(dates, x0, 1);

        if (dates[i]) {
            const xTranslate = props.x(dates[i]);

            tooltips.text((d: any) => {
                const selection = props.data.filter(item => item.id === d.id)[0];
                return selection ? `$${selection.dataY[i].toFixed(2)}` : null;
            });

            focus
                .selectAll(`.${props.baseId}_${LINECHARTIDS.TOOLTIP_CIRCLE_TRACKER_CLASS}`)
                .attr('transform', (d: any) => {
                    return `translate(${xTranslate}, ${props.y(d.dataY[i])})`;
                });

            focus
                .selectAll(`.${props.baseId}_${LINECHARTIDS.TOOLTIP_LINE_CLASS}`)
                .attr('transform', `translate(${xTranslate}, 0)`);

            focus
                .selectAll(`.${props.baseId}_${LINECHARTIDS.TOOLTIP_RECT_TRACKER_CLASS}`)
                .attr(
                    'transform',
                    `translate(${xTranslate}, ${LINECHARTCONFIGS.DEFAULT_HEIGHT + 5})`
                );

            focus
                .selectAll(`.${props.baseId}_${LINECHARTIDS.TOOLTIP_RECT_TEXT_CLASS}`)
                .text(formatDateString(dates[i]))
                .attr(
                    'transform',
                    `translate(${xTranslate}, ${LINECHARTCONFIGS.DEFAULT_HEIGHT + 14})`
                );
        }
    }

    function mouseout() {
        focus.style('opacity', 0);
    }
};
