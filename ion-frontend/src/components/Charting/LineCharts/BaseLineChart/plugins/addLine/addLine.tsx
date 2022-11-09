import * as d3 from 'd3';
import { LINECHARTIDS } from '../../config';

export const addLine = (props: {
	x: any;
	y: any;
	id: string;
	dataX: Date[];
	dataY: number[];
}): void => {

	const svg = d3.selectAll(`#${LINECHARTIDS.BASE_SVG_ID}`);

	const dataX = props.dataX.filter((_, i) => props.dataY[i])
	const dataY = props.dataY.filter((d) => d)

	const valueLine: any = d3
		.line()
		.x((_, i: number) => props.x(dataX[i]))
		.y((_, i: number) => props.y(dataY[i]));

	svg.append('path')
		.attr('id', props.id)
		.attr('fill', 'none')
		.attr('stroke', 'yellow')
		.attr('stroke-width', 1)
		.attr('d', valueLine(d3.range(dataX.length)));
};
