import * as d3 from 'd3';
import { DefaultDataProps } from '../schema/schema';
import { addArea } from '../plugins/editChart/addArea';
import { addLine } from '../plugins/editChart/addLine';
import { addMinMaxTag } from '../plugins';

interface AddChartProps extends Omit<DefaultDataProps, 'name' | 'parent'> {
    baseId: string;
    x: d3.ScaleTime<number, number, never>;
    y: d3.ScaleLinear<number, number, never>;
    normalise?: boolean;
    showEndTags?: boolean;
}

export default function addChart(props: AddChartProps) {
    let dataY = props.dataY;

    if (props.normalise) {
        const minY = Math.min(...props.dataY);
        const maxY = Math.max(...props.dataY);
        dataY = dataY.map(val => (val - minY) / (maxY - minY));
    }

    const params = {
        id: props.id,
        x: props.x,
        y: props.y,
        baseId: props.baseId,
        color: props.color,
        dataX: props.dataX,
        dataY: dataY,
    };

    if (props.type === 'line') {
        addLine(params);
    } else {
        addArea(params);
    }

    if (props.showEndTags)
        addMinMaxTag({
            baseId: props.baseId,
            x: props.x,
            y: props.y,
            dataX: props.dataX,
            dataY: props.dataY,
            color: props.color,
            normalise: props.normalise,
        });
}
