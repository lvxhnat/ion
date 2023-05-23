import { ColorsEnum } from 'common/theme';
import { typographyTheme } from 'common/theme/typography';
import * as d3 from 'd3';

interface BaseTagParams {
    baseId: string;
    x: d3.ScaleTime<number, number, never>;
    y: d3.ScaleLinear<number, number, never>;
}

interface AddTagParams extends BaseTagParams {
    text: string;
    positionX: Date;
    positionY: number;
    color?: string;
}
interface AddMinMaxTagParams extends BaseTagParams {
    dataX: Date[];
    dataY: number[];
}

export const addMinMaxTag = (props: AddMinMaxTagParams) => {
    let min: [Date, number] = [props.dataX[0], props.dataY[0]];
    let max: [Date, number] = [props.dataX[0], props.dataY[0]];

    props.dataY.map((value: number, index: number) => {
        if (value > max[1]) {
            max[1] = value;
            max[0] = props.dataX[index];
        }
        if (value < min[1]) {
            min[1] = value;
            min[0] = props.dataX[index];
        }
    });

    const tagColor = 'white';
    const minTagName = `Lo: $${min[1]}`;
    const maxTagName = `Hi: $${max[1]}`;

    const baseKwargs = {
        baseId: props.baseId,
        x: props.x,
        y: props.y,
    };
    addTag({
        ...baseKwargs,
        text: minTagName,
        positionX: min[0],
        positionY: min[1],
        color: tagColor,
    });
    addTag({
        ...baseKwargs,
        text: maxTagName,
        positionX: max[0],
        positionY: max[1],
        color: tagColor,
    });
};

export const addTag = (props: AddTagParams) => {
    // Retrieve the SVG
    const svg = d3.selectAll(`#${props.baseId}`);

    const color = props.color ?? ColorsEnum.white;
    const tagLength = props.text.length * 6; // (+typographyTheme.subtitle2.fontSize.replace("px","")) / 2
    const tagWidth = 15;

    const tag = svg.append('g').attr('class', `${props.baseId}_endTags`);

    // https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths
    const moveTo = `${props.x(props.positionX)} ${props.y(props.positionY)}`;
    let tagDraw: string;

    let offsetX: number = 20;
    let offsetY: number = 20;
    let textOffsetX: number;

    if (props.x(props.positionX) + 200 > props.x(props.x.domain()[props.x.domain().length - 1])) {
        // We change to a left facing tag if the x position of the tag is close to the right axis
        tagDraw = `M ${moveTo} l -6,-6 h -${tagLength} v ${tagWidth} h ${tagLength}`;
        offsetX *= -1;
        textOffsetX = offsetX - tagLength;
    } else {
        // We change to a right facing tag
        tagDraw = `M ${moveTo} l 6,-6 h ${tagLength} v ${tagWidth} h -${tagLength}`;
        textOffsetX = offsetX + 10;
    }
    if (props.y(props.positionY) < props.y(props.y.domain()[0]) / 2) {
        offsetY *= -1;
    }

    tag.append('path')
        .attr('d', tagDraw)
        .attr('transform', `translate(${offsetX}, ${offsetY})`)
        .attr('fill', color)
        .attr('z-index', 999);

    tag.append('circle')
        .attr('cx', props.x(props.positionX))
        .attr('cy', props.y(props.positionY))
        .attr('r', 3)
        .attr('fill', color);

    tag.append('line')
        .attr('x1', props.x(props.positionX))
        .attr('y1', props.y(props.positionY))
        .attr('x2', props.x(props.positionX) + offsetX)
        .attr('y2', props.y(props.positionY) + offsetY)
        .attr('stroke-width', 1)
        .attr('stroke', color);

    tag.append('text')
        .attr('x', props.x(props.positionX) + textOffsetX)
        .attr('y', props.y(props.positionY) + (offsetY + tagWidth / 3))
        .text(props.text)
        .attr('font-size', typographyTheme.subtitle2.fontSize);
};
