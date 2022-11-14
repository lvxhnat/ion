import * as d3 from 'd3';
import { LINECHARTCONFIGS, LINECHARTIDS } from '../../config';

export const addArea = (props: {
    x: d3.ScaleTime<number, number, never>;
    y: d3.ScaleLinear<number, number, never>;
    id: string;
    baseId: string;
    color: string;
    dataX: Date[];
    dataY: number[];
}): void => {
    const svg = d3.selectAll(`#${props.baseId}`);
    const defined = d3.map(props.dataY, (_, i) => !isNaN(props.dataY[i]));
    const indexes = d3.map(props.dataX, (_, i) => i); // Denotes simply an array containing index values

    // Calculate Area to fill the line chart
    const area: any = d3
        .area()
        .defined((_, i: number) => defined[i])
        .curve(d3.curveLinear)
        .x((_, i: number) => props.x(props.dataX[i]))
        .y0(LINECHARTCONFIGS.DEFAULT_HEIGHT - LINECHARTCONFIGS.DEFAULT_MARGIN_TOP)
        .y1((_, i: number) => props.y(props.dataY[i]));

    svg.append('path')
        .attr('id', `${props.baseId}_${props.id}`)
        .attr('fill', props.color)
        .attr('opacity', LINECHARTCONFIGS.DEFAULT_LINE_AREA_OPACITY)
        .attr('d', area(indexes.filter(i => defined[i])));
};
