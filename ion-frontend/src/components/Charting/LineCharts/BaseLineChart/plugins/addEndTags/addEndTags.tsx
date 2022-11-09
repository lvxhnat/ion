import * as d3 from 'd3';
import { LINECHARTCONFIGS, LINECHARTIDS } from '../../config';
import { getFontColor } from '../../../TSChart/helpers/style';

export const addEndTags = (props: {
    y: d3.ScaleLinear<number, number, never>, id: string, dataY: number[], color: string,
}): void => {
    const svg = d3.selectAll(`#${LINECHARTIDS.BASE_SVG_ID}`);

    svg.append('g').attr('id', 'end-tags');

    d3.selectAll('#end-tags')
        .selectAll(`path ${props.id}`)
        .data(props.dataY)
        .join('path')
        .attr('d', (d) => `M ${1} ${props.y(d)} l 6,-6 h 42 v 12 h -16 l -26,0`)
        .attr(
            'transform',
            `translate(${LINECHARTCONFIGS.DEFAULT_WIDTH - LINECHARTCONFIGS.DEFAULT_MARGIN_RIGHT},0)`
        )
        .attr('fill', props.color);

    d3.selectAll('#end-tags')
        .selectAll(`.label ${props.id}`)
        .data(props.dataY)
        .join('text')
        .text(d => d.toFixed(2))
        .attr('x', LINECHARTCONFIGS.DEFAULT_WIDTH - LINECHARTCONFIGS.DEFAULT_MARGIN_RIGHT + 10)
        .attr('y', d => +props.y(d) + 3)
        .attr('text-anchor', 'start')
        .attr('font-size', '9px')
        .attr('fill', getFontColor(props.color));
};
