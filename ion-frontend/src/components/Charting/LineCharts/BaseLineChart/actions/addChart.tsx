import * as d3 from 'd3';
import { LINECHARTCONFIGS, LINECHARTIDS } from '../config';
import * as C from '../plugins';
import { AllowedLineTypes } from '../type';

export default function addChart(props: {
    x: d3.ScaleTime<number, number, never>;
    y: d3.ScaleLinear<number, number, never>;
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
        color: props.color,
        dataX: props.dataX,
        dataY: props.dataY,
    });

    C.addEndTags({
        y: props.y,
        id: props.id,
        dataY: [props.dataY[props.dataY.length - 1]],
        color: props.color,
    });

    if (props.type === 'areaLine') {
        C.addArea({
            id: props.id,
            x: props.x,
            y: props.y,
            color: props.color,
            dataX: props.dataX,
            dataY: props.dataY,
        });
    }
}
