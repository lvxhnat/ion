import * as d3 from 'd3';
import * as C from '../plugins';
import { AllowedLineTypes } from '../schema/schema';

export default function addChart(props: {
    x: d3.ScaleTime<number, number, never>;
    y: d3.ScaleLinear<number, number, never>;
    baseId: string;
    type: AllowedLineTypes;
    color: string;
    id: string;
    dataX: Date[];
    dataY: number[];
}) {
    C.addLine({
        x: props.x,
        y: props.y,
        id: props.id,
        baseId: props.baseId,
        color: props.color,
        dataX: props.dataX,
        dataY: props.dataY,
    });

    if (props.type !== 'pureLine') {
        C.addEndTags({
            y: props.y,
            id: props.id,
            baseId: props.baseId,
            dataY: [props.dataY[props.dataY.length - 1]],
            color: props.color,
        });
    }

    if (props.type === 'areaLine') {
        C.addArea({
            id: props.id,
            baseId: props.baseId,
            x: props.x,
            y: props.y,
            color: props.color,
            dataX: props.dataX,
            dataY: props.dataY,
        });
    }
}
