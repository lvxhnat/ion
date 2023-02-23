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
    const scale = 0.3;
    console.log(props.color, getFontColor(props.color));

    svg.append('g').attr('id', `${props.baseId}_${CHARTIDS.ENDTAG_GROUP_ID}`);

    d3.selectAll(`#${props.baseId}_${CHARTIDS.ENDTAG_GROUP_ID}`)
        .selectAll(`path #${props.baseId}_${props.id}`)
        .data(props.dataY)
        .join('path')
        .attr(
            'd',
            d =>
                `M ${1} ${props.y(d)} l ${6 * scale},-${6 * scale} h ${42 * scale} v ${
                    12 * scale
                } h -${16 * scale} l -${26 * scale},0`
        )
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
        .attr(
            'x',
            CHARTCONFIGS.DEFAULT_WIDTH -
                CHARTCONFIGS.DEFAULT_MARGIN_RIGHT +
                CHARTCONFIGS.DEFAULT_MARGIN_LEFT * 0.25
        )
        .attr('y', d => +props.y(d) * 1.05)
        .attr('text-anchor', 'start')
        .attr('font-size', CHARTCONFIGS.DEFAULT_AXIS_FONTSIZE)
        .attr('id', `${props.baseId}_${props.id}`)
        .attr('fill', getFontColor(props.color));
};
