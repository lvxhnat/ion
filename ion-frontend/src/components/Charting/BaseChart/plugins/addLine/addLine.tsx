import * as d3 from 'd3';
import { CHARTCONFIGS, CHARTIDS } from '../../config';

export const addLine = (props: {
    x: d3.ScaleTime<number, number, never>;
    y: d3.ScaleLinear<number, number, never>;
    id: string;
    baseId: string;
    color: string;
    dataX: Date[];
    dataY: number[];
}): void => {
    const svg = d3.selectAll(`#${props.baseId}`);

    const dataX = props.dataX.filter((_, i) => props.dataY[i]);
    const dataY = props.dataY.filter(d => d);

    const valueLine: any = d3
        .line()
        .x((_, i: number) => props.x(dataX[i]))
        .y((_, i: number) => props.y(dataY[i]));

    svg.append('path')
        .attr('id', `${props.baseId}_${props.id}`)
        .attr('fill', 'none')
        .attr('stroke', props.color)
        .attr('stroke-width', CHARTCONFIGS.DEFAULT_LINE_STROKE_WIDTH)
        .attr('d', valueLine(d3.range(dataX.length)));
};
