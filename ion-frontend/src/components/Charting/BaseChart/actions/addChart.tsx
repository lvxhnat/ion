import * as d3 from 'd3';
import { DefaultDataProps } from '../schema/schema';
import { addArea } from '../plugins/editChart/addArea';
import { addLine } from '../plugins/editChart/addLine';

interface addChartProps extends Omit<DefaultDataProps, 'name' | 'parent'> {
    baseId: string;
    x: d3.ScaleTime<number, number, never>;
    y: d3.ScaleLinear<number, number, never>;
}

export default function addChart(props: addChartProps) {
    const params = {
            id: props.id,
            x: props.x,
            y: props.y,
            baseId: props.baseId,
            color: props.color,
            dataX: props.dataX,
            dataY: props.dataY,
    };
    if (props.type === 'line') {
        addLine(params)
    } else {
        addArea(params)
    }
}
