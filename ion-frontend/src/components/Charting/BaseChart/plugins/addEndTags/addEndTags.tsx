import * as d3 from 'd3';
import { CHARTCONFIGS, CHARTIDS } from '../../config';
import { getFontColor } from '../../../TSChart/helpers/style';

export const addEndTags = (props: {
    y: d3.ScaleLinear<number, number, never>;
    id: string;
    baseId: string;
    dataY: number[];
    color: string;
}): void => {
    const svg = d3.selectAll(`#${props.baseId}`);

    svg.append('g').attr('id', `${props.baseId}_${CHARTIDS.ENDTAG_GROUP_ID}`);

    d3.selectAll(`#${props.baseId}_${CHARTIDS.ENDTAG_GROUP_ID}`)
        .selectAll(`path #${props.baseId}_${props.id}`)
        .data(props.dataY)
        .join('path')
        .attr('d', d => `M ${1} ${props.y(d)} l 6,-6 h 42 v 12 h -16 l -26,0`)
        .attr(
            'transform',
            `translate(${CHARTCONFIGS.DEFAULT_WIDTH - CHARTCONFIGS.DEFAULT_MARGIN_RIGHT},0)`
        )
        .attr('fill', props.color);

    d3.selectAll(`#${props.baseId}_${CHARTIDS.ENDTAG_GROUP_ID}`)
        .selectAll(`.label #${props.baseId}_${props.id}`)
        .data(props.dataY)
        .join('text')
        .text(d => `$${d < 10 ? d.toFixed(4) : d.toFixed(2)}`)
        .attr('x', CHARTCONFIGS.DEFAULT_WIDTH - CHARTCONFIGS.DEFAULT_MARGIN_RIGHT + 10)
        .attr('y', d => +props.y(d) + 3)
        .attr('text-anchor', 'start')
        .attr('font-size', '9px')
        .attr('id', `${props.baseId}_${props.id}`)
        .attr('fill', getFontColor(props.color));
};
