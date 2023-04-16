import * as d3 from 'd3';
import { CHARTCONFIGS } from '../../config';
import { returnChartAxis } from '../../BaseChart';

/**
 * Add a line to a BaseLineChart object. The line ID will be denoted by {BaseLineChartID_AssignedLineID}.
 * @param id the ID we wish to assign to the line we will be appending on to the chart. This will be AssignedLineID stated in the desc above.
 * @param baseId the ID of the BaseLineChart component we created.
 * @param ...
 */
export const addLine = (props: {
    id: string;
    x: d3.ScaleTime<number, number, never>;
    y: d3.ScaleLinear<number, number, never>;
    baseId: string;
    color: string;
    dataX: Date[];
    dataY: number[];
}): void => {
    const svg = d3.selectAll(`#${props.baseId}`);

    const lineIdComposed: string = `${props.baseId}_${props.id}`;

    const valueLine: any = d3
        .line()
        .x((_, i: number) => props.x(props.dataX[i]))
        .y((_, i: number) => props.y(props.dataY[i]))
        .defined((_, i) => !!props.dataY[i]);

    svg.append('path')
        .attr('id', lineIdComposed)
        .attr('fill', 'none')
        .attr('stroke', props.color)
        .attr('stroke-width', CHARTCONFIGS.DEFAULT_LINE_STROKE_WIDTH)
        .attr('d', valueLine(d3.range(props.dataX.length)));
};

export const removeLine = (props: { id: string; baseId: string }): void => {
    const lineIdComposed: string = `${props.baseId}_${props.id}`;
    d3.select(`#${lineIdComposed}`).remove();
};
