import * as d3 from 'd3';

interface RemoveChartProps {
    baseId: string;
    id?: string;
    class?: string;
    identifier?: string;
    selectAll?: boolean;
}

export default function removeChart(props: RemoveChartProps): void {
    if (props.id && props.class) {
        throw Error('Provide on id or class, not both.');
    }
    let lineId: string;
    if (props.id) {
        lineId = `#${props.baseId}_${props.id}`;
    } else {
        lineId = `.${props.baseId}_${props.class}`;
    }
    if (props.identifier) {
        lineId = `${lineId}_${props.identifier}`;
    }
    if (props.selectAll) {
        d3.selectAll(lineId).remove();
    } else {
        d3.selectAll(`${lineId}:last-of-type`).remove();
    }
}
