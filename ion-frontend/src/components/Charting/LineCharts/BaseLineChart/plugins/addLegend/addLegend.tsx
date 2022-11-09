import { ColorsEnum } from 'common/theme';
import * as d3 from 'd3';
import { LINECHARTCONFIGS, LINECHARTIDS } from '../../config';

interface LegendObject {
    name: string;
    id: string;
    color: string;
    parent: boolean;
}

type LegendDataProps = LegendObject[];

function truncateString(s: string): string {
    if (s.length > 20) return s.slice(0, 20) + '...';
    else return s;
}

/**
 * Accomodates multiple lines for legend plotting
 */
export const addLegend = (props: { legend: LegendDataProps }): void => {
    const svg = d3.selectAll(`#${LINECHARTIDS.BASE_SVG_ID}`);

    const treePosition = LINECHARTCONFIGS.DEFAULT_MARGIN_LEFT + 10;
    const boxXPosition = treePosition + 10;
    const labelXPosition = boxXPosition + LINECHARTCONFIGS.DEFAULT_LEGEND_BOX_SIZE + 3;
    const valueXPosition = LINECHARTCONFIGS.DEFAULT_LEGEND_WIDTH - 20;

    const parentBoxSize = LINECHARTCONFIGS.DEFAULT_LEGEND_PARENT_TREE_BOX_SIZE;

    svg.append('g')
        .attr('id', 'legend')
        .append('rect')
        .attr('class', 'legend-box')
        .attr('x', LINECHARTCONFIGS.DEFAULT_MARGIN_LEFT + 2)
        .attr('y', (d, i) => LINECHARTCONFIGS.DEFAULT_MARGIN_TOP + i * 15)
        .attr('rx', 5)
        .attr('height', props.legend.length * (LINECHARTCONFIGS.DEFAULT_LEGEND_BOX_SIZE + 6))
        .attr('width', LINECHARTCONFIGS.DEFAULT_LEGEND_WIDTH)
        .attr('fill', ColorsEnum.darkGrey)
        .attr('opacity', LINECHARTCONFIGS.DEFAULT_LEGEND_OPACITY);

    // Create the tree
    const legendTree = svg.selectAll('#legend');
    for (let i = 0; i < props.legend.length; i++) {
        if (props.legend[i].parent) {
            legendTree
                .append('rect')
                .attr('class', 'parent-indicator')
                .attr('x', treePosition)
                .attr('y', LINECHARTCONFIGS.DEFAULT_MARGIN_TOP + parentBoxSize * 1.5 + i * 15)
                .attr('width', 5)
                .attr('height', 5)
                .attr('stroke', 'white')
                .attr('fill', 'transparent');
        } else {
            const xOffset = treePosition + 5 * 0.5;
            const y2Offset = LINECHARTCONFIGS.DEFAULT_MARGIN_TOP + parentBoxSize * 1.5 + i * 15 + 5;

            svg.selectAll('#legend') // Plot the vertical line
                .append('line')
                .attr('class', 'parent-indicator-line')
                .attr('x1', xOffset)
                .attr('x2', xOffset)
                .attr('y1', LINECHARTCONFIGS.DEFAULT_MARGIN_TOP + i * 15 - parentBoxSize * 0.5)
                .attr('y2', y2Offset)
                .attr('stroke', 'white');
            svg.selectAll('#legend') // Plot the horizontal line
                .append('line')
                .attr('class', 'parent-indicator-line')
                .attr('x1', xOffset)
                .attr('x2', treePosition + parentBoxSize)
                .attr('y1', y2Offset)
                .attr('y2', y2Offset)
                .attr('stroke', 'white');
        }
    }

    // Append the legend squares
    d3.selectAll('#legend')
        .selectAll('rect .legend-hint')
        .data(props.legend)
        .enter()
        .append('rect')
        .attr('class', 'legend-hint')
        .attr('x', boxXPosition)
        .attr('y', (d, i) => LINECHARTCONFIGS.DEFAULT_MARGIN_TOP + i * 15 + 5) // 5 denotes padding from the top box
        .attr('height', LINECHARTCONFIGS.DEFAULT_LEGEND_BOX_SIZE)
        .attr('width', LINECHARTCONFIGS.DEFAULT_LEGEND_BOX_SIZE)
        .attr('fill', d => d.color);

    d3.selectAll('#legend')
        .selectAll('text')
        .data(props.legend)
        .enter()
        .append('text')
        .attr('class', 'legend-text')
        .attr('x', labelXPosition)
        .attr('y', (d, i) => LINECHARTCONFIGS.DEFAULT_MARGIN_TOP + i * 15 + 11)
        .attr('width', valueXPosition - labelXPosition - 10)
        .style('fill', d => ColorsEnum.white)
        .style('alignment-baseline', 'middle')
        .style('font-size', '10px')
        .attr('text-anchor', 'left')
        .text(d => truncateString(d.name));

    d3.selectAll('#legend')
        .selectAll('text .legend-value')
        .data(props.legend)
        .enter()
        .append('text')
        .attr('class', 'legend-value')
        .attr('id', d => d.id)
        .attr('x', valueXPosition) // 20 pixels from the right
        .attr('y', (d, i) => LINECHARTCONFIGS.DEFAULT_MARGIN_TOP + i * 15 + 11)
        .style('fill', d => ColorsEnum.white)
        .style('alignment-baseline', 'middle')
        .style('font-size', '10px')
        .attr('text-anchor', 'left');

};
