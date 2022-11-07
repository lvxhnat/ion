import * as d3 from 'd3';
import { LineChartConfig } from '../../config';

type CreateToolTipProps = {
    x: any,
    y: any,
    fontColor: string,
    svg: d3.Selection<SVGElement, {}, HTMLElement, any>,
    dataX: Array<Date>,
    dataY: Array<number>,
}

export const addToolTip = (props: Required<CreateToolTipProps>) => {

	const svg = props.svg;
	const bisect = d3.bisector((d: any) => d).left;

	const focus = svg.append('g')
		.attr('id', 'tooltip-focus')
		.style('opacity', 0);

	// Create the text that travels along the curve of chart
	const tooltip = d3.selectAll('#linechart-tooltip')
		.append('div')
		.attr('id', 'tooltip')
		.style('opacity', 0)
		.attr('transform', `translate(0, -${LineChartConfig.DEFAULT_MARGIN_BOTTOM})`)
		.style('font-size', LineChartConfig.DEFAULT_TOOLTIP_FONTSIZE)
		.style('color', props.fontColor)
		.style('padding', '0 10px')
		.style('text-align', 'left')
		.attr('alignment-baseline', 'middle');

	// append the circle at the intersection               
	focus.append('circle')
		.attr('id', 'tooltip-point-tracker')
		.style('fill', 'none')
		.style('stroke', props.fontColor)
		.attr('r', 4);

	focus.append('line')
		.attr('id', 'tooltip-x-line')
		.style('stroke', props.fontColor)
		.style('stroke-dasharray', '3,3')
		.style('opacity', 0.5)
		.attr('y1', LineChartConfig.DEFAULT_MARGIN_BOTTOM)
		.attr('y2', LineChartConfig.DEFAULT_HEIGHT - LineChartConfig.DEFAULT_MARGIN_TOP);

	// Create a rect on top of the svg area: this rectangle recovers mouse position
	svg.append('rect')
		.attr('id', 'tooltip-rect')
		.style('fill', 'none')
		.style('pointer-events', 'all')
		.attr('width', LineChartConfig.DEFAULT_WIDTH - LineChartConfig.DEFAULT_MARGIN_LEFT)
		.attr('height', LineChartConfig.DEFAULT_HEIGHT)
		.on('mouseover', mouseover)
		.on('mousemove', mousemove)
		.on('mouseout', mouseout);

	function mouseover() {
		tooltip.style('opacity', 1);
		focus.style('opacity', 1);
	}

	function mousemove(e: any) {
		// https://stackoverflow.com/questions/68156231/d3-x-invert-returning-invalid-date-from-d3-pointer-d3-v6
		const x0 = props.x.invert(d3.pointer(e, svg.node())[0]);
		const i = bisect(props.dataX, x0, 1);
		const d0: any = props.dataX[i - 1];
		const d1: any = props.dataX[i];

		if (d0 && d1) {
			const d = x0 - d0 > d1 - x0 ? d1 : d0;

			tooltip.html(`<b>Date:</b> ${props.dataX[i]} <b>Price:</b> $ ${props.dataY[i]}`);

			focus.select('#tooltip-point-tracker')
				.attr('transform', `translate(${props.x(props.dataX[i])}, ${props.y(props.dataY[i])})`);

			focus.select('#tooltip-x-line')
				.attr('transform', `translate(${props.x(props.dataX[i])}, 0)`);
		}
	}

	function mouseout() {
		tooltip.style('opacity', 0);
		focus.style('opacity', 0);
	}

};
