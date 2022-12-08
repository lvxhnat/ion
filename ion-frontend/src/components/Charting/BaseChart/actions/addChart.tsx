import { ColorsEnum } from 'common/theme';
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
    const addEndTags = (tagPosition: number, color?: string) => {
        return C.addEndTags({
            y: props.y,
            id: props.id,
            baseId: props.baseId,
            dataY: [tagPosition],
            color: color === undefined ? props.color : color,
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

    let data: number[];
    if (props.dataY[0].constructor.name === 'Object') {
        data = (props.dataY as OHLCDataSchema[]).map((d: OHLCDataSchema) => d.close) as number[];
    } else {
        data = props.dataY as number[];
    }

    if (props.type === 'line') {
        addLine(data);
        addEndTags(data[data.length - 1]);
    } else if (props.type === 'candleStick' || props.type === 'barStick') {
        // Use End Tags
        const data: OHLCDataSchema[] = props.dataY as OHLCDataSchema[];
        addEndTags(data[data.length - 1].close, ColorsEnum.white);
        C.addOHLC({
            baseId: props.baseId,
            x: props.x,
            y: props.y,
            dataX: props.dataX,
            dataY: data,
            variation: props.type,
        });
    } else if (props.type === 'areaLine') {
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
        addLine(data);
    }
}
