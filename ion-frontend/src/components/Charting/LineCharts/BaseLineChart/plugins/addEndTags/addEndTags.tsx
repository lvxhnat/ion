import * as d3 from 'd3';
import { LINECHARTCONFIGS, LINECHARTIDS } from '../../config';

export const addEndTags = (props: { y: any; dataY: Array<number> }) => {
    const svg = d3.selectAll(`#${LINECHARTIDS.BASE_SVG_ID}`);

    svg.append('g').attr('id', 'end-tags');

    d3.selectAll('#end-tags')
        .selectAll('path')
        .data(props.dataY)
        .join('path')
        .attr('d', (d, i) => {
            return `M ${1} ${props.y(d)} l 6,-6 h 50 v 12 h -24 l -26,0`;
        })
        .attr(
            'transform',
            `translate(${LINECHARTCONFIGS.DEFAULT_WIDTH - LINECHARTCONFIGS.DEFAULT_MARGIN_RIGHT},0)`
        )
        .attr('fill', (d, i) => d3.schemeTableau10[i]);

    d3.selectAll('#end-tags')
        .selectAll('.label')
        .data(props.dataY)
        .join('text')
        .text(d => d)
        .attr('x', LINECHARTCONFIGS.DEFAULT_WIDTH - LINECHARTCONFIGS.DEFAULT_MARGIN_RIGHT + 10)
        .attr('y', d => props.y(d) + 3)
        .attr('text-anchor', 'start')
        .attr('font-size', '9px')
        .attr('fill', 'white');
};
