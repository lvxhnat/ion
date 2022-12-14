import * as d3 from 'd3';
import { ColorsEnum } from 'common/theme';
import { CHARTCONFIGS, CHARTIDS } from '../../config';
import { DefaultDataProps } from '../../schema/schema';
import { OHLCDataSchema } from 'data/schema/common';

function formatDateString(d: Date) {
    const zeroPad = (n: number) => `${`0${n + 1}`.slice(-2)}`;
    return `${zeroPad(d.getDate())}/${zeroPad(d.getMonth())}/${d.getFullYear()} ${zeroPad(
        d.getHours()
    )}:${zeroPad(d.getMinutes())}`;
}

export const addToolTip = (props: { x: any; y: any; baseId: string; data: DefaultDataProps[] }) => {
    const svg = d3.selectAll(`#${props.baseId} `);
    const dates = props.data[0].dataX;
    const bisect = d3.bisector((d: any) => d).left;
    // If OHLC Data, we pick close
    let data: number[];
    if (props.data[0].dataY[0].constructor.name === 'Object') {
        data = (props.data[0].dataY as OHLCDataSchema[]).map(
            (d: OHLCDataSchema) => d.close
        ) as number[];
    } else {
        data = props.data[0].dataY as number[];
    }

    const focus = svg
        .append('g')
        .attr('class', `${props.baseId}_${CHARTIDS.TOOLTIP_FOCUS_CLASS}`)
        .style('opacity', 0);

    // Create the text that travels along the curve of chart
    const tooltips = d3.selectAll(`.${props.baseId}_${CHARTIDS.LEGEND_VALUE_CLASS}`);

    if (d3.selectAll(`.${props.baseId}_${CHARTIDS.TOOLTIP_RECT_TRACKER_CLASS}`).empty()) {
        // Append the rectangle that will contain the text at the bottom of the chart
        focus
            .append('rect')
            .attr('class', `${props.baseId}_${CHARTIDS.TOOLTIP_RECT_TRACKER_CLASS}`)
            .style('fill', ColorsEnum.white)
            .attr('width', 80)
            .attr('height', 20)
            .attr('transform', `translate(${CHARTCONFIGS.DEFAULT_MARGIN_LEFT}, 0)`);
        // Append text to the bottom of the chart
        focus
            .append('text')
            .attr('class', `${props.baseId}_${CHARTIDS.TOOLTIP_RECT_TEXT_CLASS}`)
            .attr('font-size', '10px')
            .attr('transform', `translate(${CHARTCONFIGS.DEFAULT_MARGIN_LEFT}, 0)`);
        // Add the vertical line that tracks all the data points
        focus
            .append('line')
            .attr('class', `${props.baseId}_${CHARTIDS.TOOLTIP_LINE_CLASS}`)
            .style('stroke', ColorsEnum.white)
            .style('stroke-dasharray', '3,3')
            .style('stroke-width', 1)
            .style('opacity', 0.5)
            .attr('y1', CHARTCONFIGS.DEFAULT_MARGIN_BOTTOM)
            .attr('y2', CHARTCONFIGS.DEFAULT_HEIGHT - CHARTCONFIGS.DEFAULT_MARGIN_TOP);
        // Create a rect on top of the svg area: this rectangle recovers mouse position
        svg.append('rect')
            .attr('class', `${props.baseId}_${CHARTIDS.TOOLTIP_ENCOMPASSING_RECT_CLASS}`)
            .style('fill', 'none')
            .style('pointer-events', 'all')
            .attr('width', CHARTCONFIGS.DEFAULT_WIDTH - CHARTCONFIGS.DEFAULT_MARGIN_LEFT)
            .attr('height', CHARTCONFIGS.DEFAULT_HEIGHT)
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
            tooltips.text(data[i]);

            focus
                .selectAll(`.${props.baseId}_${CHARTIDS.TOOLTIP_LINE_CLASS}`)
                .attr('transform', `translate(${xTranslate}, 0)`);

            focus
                .selectAll(`.${props.baseId}_${CHARTIDS.TOOLTIP_RECT_TRACKER_CLASS}`)
                .attr('transform', `translate(${xTranslate}, ${CHARTCONFIGS.DEFAULT_HEIGHT + 5})`);

            focus
                .selectAll(`.${props.baseId}_${CHARTIDS.TOOLTIP_RECT_TEXT_CLASS}`)
                .text(formatDateString(dates[i]))
                .attr('transform', `translate(${xTranslate}, ${CHARTCONFIGS.DEFAULT_HEIGHT + 14})`);
        }
    }

    function mouseout() {
        focus.style('opacity', 0);
    }
};
