import { ColorsEnum } from 'common/theme';
import * as d3 from 'd3';
import { LINECHARTCONFIGS, LINECHARTIDS } from '../../config';

type CreateToolTipProps = {
    x: any;
    y: any;
    fontColor: string;
    dataX: Array<Date>;
    dataY: Array<number>;
};

function formatDateString(d: Date) {
    const zeroPad = (n: number) => `${`0${n + 1}`.slice(-2)}`;
    return `${zeroPad(d.getDate())}/${zeroPad(d.getMonth())}/${d.getFullYear()} ${zeroPad(
        d.getHours()
    )}:${zeroPad(d.getMinutes())}`;
}

export const addToolTip = (props: Required<CreateToolTipProps>) => {
    const svg = d3.selectAll(`#${LINECHARTIDS.BASE_SVG_ID} `);
    const bisect = d3.bisector((d: any) => d).left;

    const focus = svg.append('g').attr('id', 'tooltip-focus').style('opacity', 0);

    // Create the text that travels along the curve of chart
    const tooltip = d3.selectAll('#eur_usd_spot');

    // append the circle at the intersection
    focus
        .append('circle')
        .attr('id', 'tooltip-point-tracker')
        .style('fill', 'none')
        .style('stroke', props.fontColor)
        .attr('r', 4);

    focus
        .append('rect')
        .attr('id', 'tooltip-x-tracker')
        .style('fill', ColorsEnum.white)
        .attr('width', 80)
        .attr('height', 20)
        .attr('transform', `translate(${LINECHARTCONFIGS.DEFAULT_MARGIN_LEFT}, 0)`);

    focus
        .append('text')
        .attr('id', 'tooltip-x-tracker-text')
        .attr('font-size', '10px')
        .attr('transform', `translate(${LINECHARTCONFIGS.DEFAULT_MARGIN_LEFT}, 0)`);

    focus
        .append('line')
        .attr('id', 'tooltip-x-line')
        .style('stroke', props.fontColor)
        .style('stroke-dasharray', '3,3')
        .style('opacity', 0.5)
        .attr('y1', LINECHARTCONFIGS.DEFAULT_MARGIN_BOTTOM)
        .attr('y2', LINECHARTCONFIGS.DEFAULT_HEIGHT - LINECHARTCONFIGS.DEFAULT_MARGIN_TOP);

    // Create a rect on top of the svg area: this rectangle recovers mouse position
    svg.append('rect')
        .attr('id', 'tooltip-rect')
        .style('fill', 'none')
        .style('pointer-events', 'all')
        .attr('width', LINECHARTCONFIGS.DEFAULT_WIDTH - LINECHARTCONFIGS.DEFAULT_MARGIN_LEFT)
        .attr('height', LINECHARTCONFIGS.DEFAULT_HEIGHT)
        .on('mouseover', mouseover)
        .on('mousemove', mousemove)
        .on('mouseout', mouseout);

    function mouseover() {
        tooltip.text(`$ ${props.dataY[props.dataY.length - 1]} `);
        focus.style('opacity', 1);
    }

    function mousemove(e: any) {
        // https://stackoverflow.com/questions/68156231/d3-x-invert-returning-invalid-date-from-d3-pointer-d3-v6
        const x0 = props.x.invert(d3.pointer(e, svg.node())[0]);
        const i = bisect(props.dataX, x0, 1);
        const d0: any = props.dataX[i - 1];
        const d1: any = props.dataX[i];

        if (d0 && d1) {
            const d = x0 - d0 > d1 - x0 ? d1 : d0;

            tooltip.text(`$ ${props.dataY[i]} `);

            focus
                .select('#tooltip-point-tracker')
                .attr(
                    'transform',
                    `translate(${props.x(props.dataX[i])}, ${props.y(props.dataY[i])})`
                );

            focus
                .select('#tooltip-x-line')
                .attr('transform', `translate(${props.x(props.dataX[i])}, 0)`);

            focus
                .select('#tooltip-x-tracker')
                .attr(
                    'transform',
                    `translate(${props.x(props.dataX[i])}, ${LINECHARTCONFIGS.DEFAULT_HEIGHT + 5})`
                );

            focus
                .select('#tooltip-x-tracker-text')
                .text(formatDateString(props.dataX[i]))
                .attr(
                    'transform',
                    `translate(${props.x(props.dataX[i])}, ${LINECHARTCONFIGS.DEFAULT_HEIGHT + 14})`
                );
        }
    }

    function mouseout() {
        tooltip.text(`$ ${props.dataY[props.dataY.length - 1]} `);
        focus.style('opacity', 0);
    }
};
