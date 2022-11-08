import { ColorsEnum } from 'common/theme';
import * as d3 from 'd3';
import { LINECHARTCONFIGS, LINECHARTIDS } from '../../config';

interface LegendObject {
    name: string,
    id: string,
    color: string,
    parent: boolean
}

type LegendDataProps = Array<LegendObject>

function truncateString(s: string) {
    if (s.length > 20) return s.slice(0, 20) + "...";
    else return s;
}

/**
 * Accomodates multiple lines for legend plotting
 */
export const addLegend = (props: { legend: LegendDataProps }) => {

    const svg = d3.selectAll(`#${LINECHARTIDS.BASE_SVG_ID}`);

    const boxXPosition = LINECHARTCONFIGS.DEFAULT_MARGIN_LEFT + 10;
    const labelXPosition = boxXPosition + LINECHARTCONFIGS.DEFAULT_LEGEND_BOX_SIZE + 10;
    const valueXPosition = LINECHARTCONFIGS.DEFAULT_LEGEND_WIDTH - 20;

    svg.append("g")
        .attr("id", "legend")
        .append("rect")
        .attr("class", "legend-box")
        .attr("x", LINECHARTCONFIGS.DEFAULT_MARGIN_LEFT + 5)
        .attr("y", (d, i) => LINECHARTCONFIGS.DEFAULT_MARGIN_TOP + i * 15)
        .attr("rx", 5)
        .attr("height", props.legend.length * LINECHARTCONFIGS.DEFAULT_LEGEND_BOX_SIZE + 20)
        .attr("width", LINECHARTCONFIGS.DEFAULT_LEGEND_WIDTH)
        .attr("fill", ColorsEnum.darkGrey)
        .attr("opacity", LINECHARTCONFIGS.DEFAULT_LEGEND_OPACITY)

    // Append the legend squares
    d3.selectAll("#legend")
        .selectAll("rect .legend-hint")
        .data(props.legend)
        .enter()
        .append("rect")
        .attr("class", "legend-hint")
        .attr("x", boxXPosition)
        .attr("y", (d, i) => LINECHARTCONFIGS.DEFAULT_MARGIN_TOP + i * 15 + 5) // 5 denotes padding from the top box
        .attr("height", LINECHARTCONFIGS.DEFAULT_LEGEND_BOX_SIZE)
        .attr("width", LINECHARTCONFIGS.DEFAULT_LEGEND_BOX_SIZE)
        .attr("fill", d => d.color)

    d3.selectAll("#legend")
        .selectAll("text")
        .data(props.legend)
        .enter()
        .append("text")
        .attr("class", "legend-text")
        .attr("x", labelXPosition)
        .attr("y", (d, i) => LINECHARTCONFIGS.DEFAULT_MARGIN_TOP + i * 15 + 11)
        .attr("width", valueXPosition - labelXPosition - 10)
        .style("fill", d => ColorsEnum.white)
        .style("alignment-baseline", "middle")
        .style("font-size", "10px")
        .attr("text-anchor", "left")
        .text(d => truncateString(d.name))

    d3.selectAll("#legend")
        .selectAll("text .legend-value")
        .data(props.legend)
        .enter()
        .append("text")
        .attr("class", "legend-value")
        .attr("id", d => d.id)
        .attr("x", valueXPosition) // 20 pixels from the right
        .attr("y", (d, i) => LINECHARTCONFIGS.DEFAULT_MARGIN_TOP + i * 15 + 11)
        .style("fill", d => ColorsEnum.white)
        .style("alignment-baseline", "middle")
        .style("font-size", "10px")
        .attr("text-anchor", "left")
}