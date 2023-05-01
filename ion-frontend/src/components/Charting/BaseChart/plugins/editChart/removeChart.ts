import * as d3 from 'd3';

export const removeLine = (props: { id: string; baseId: string }): void => {
    const lineIdComposed: string = `${props.baseId}_${props.id}`;
    d3.select(`#${lineIdComposed}`).remove();
};
