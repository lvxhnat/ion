import * as d3 from 'd3';
import { OHLCDataSchema } from 'data/schema/common';
import * as C from '../plugins';
import { DefaultDataProps } from '../schema/schema';

interface addChartProps extends Omit<DefaultDataProps, 'name' | 'parent'> {
    x: d3.ScaleTime<number, number, never>;
    y: d3.ScaleLinear<number, number, never>;
    baseId: string;
}

export default function addChart(props: addChartProps) {
    const addEndTags = (tagPosition: number) => {
        return C.addEndTags({
            y: props.y,
            id: props.id,
            baseId: props.baseId,
            dataY: [tagPosition],
            color: props.color,
        });
    };

    const addLine = (data: number[]) => {
        return C.addLine({
            x: props.x,
            y: props.y,
            id: props.id,
            baseId: props.baseId,
            color: props.color,
            dataX: props.dataX,
            dataY: data,
        });
    };
    // Add End Tags to the end of charts on Y-Axis
    if (props.type === 'line') {
        const data: number[] = props.dataY as number[];
        addLine(data);
        addEndTags(data[data.length - 1]);
    } else if (props.type === 'candleStick' || props.type === 'barStick') {
        // Use End Tags
        const data: OHLCDataSchema[] = props.dataY as OHLCDataSchema[];
        addEndTags(data[data.length - 1].close);
        C.addOHLC({
            baseId: props.baseId,
            x: props.x,
            y: props.y,
            dataX: props.dataX,
            dataY: data,
            variation: props.type,
        });
    } else if (props.type === 'areaLine') {
        const data: number[] = props.dataY as number[];
        addLine(data);
        C.addArea({
            id: props.id,
            baseId: props.baseId,
            x: props.x,
            y: props.y,
            color: props.color,
            dataX: props.dataX,
            dataY: data,
        });
        addEndTags(data[data.length - 1]);
    } else if (props.type === 'pureLine') {
        const data: number[] = props.dataY as number[];
        addLine(data);
    }
}
