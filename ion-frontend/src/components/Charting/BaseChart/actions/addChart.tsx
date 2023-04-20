import * as d3 from 'd3';
import * as C from '../plugins';
import { DefaultDataProps } from '../schema/schema';

interface addChartProps extends Omit<DefaultDataProps, 'name' | 'parent'> {
    baseId: string;
    x: d3.ScaleTime<number, number, never>;
    y: d3.ScaleLinear<number, number, never>;
}

export default function addChart(props: addChartProps) {
    const addLine = (data: number[]) => {
        return C.addLine({
            id: props.id,
            x: props.x,
            y: props.y,
            baseId: props.baseId,
            color: props.color,
            dataX: props.dataX,
            dataY: data,
        });
    };

    let data: number[];

    data = props.dataY;

    if (props.type === 'line') {
        addLine(data);
    } else if (props.type === 'candleStick' || props.type === 'barStick') {
    } else if (props.type === 'areaLine') {
        addLine(data);
    } else if (props.type === 'pureLine') {
        addLine(data);
    }
}
