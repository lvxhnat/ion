import { ColorsEnum } from 'common/theme';
import { typographyTheme } from 'common/theme/typography';
import * as d3 from 'd3';
import { determineNumericalFormat } from '../../BaseChart';

interface BaseTagParams {
    baseId: string;
    x: d3.ScaleTime<number, number, never>;
    y: d3.ScaleLinear<number, number, never>;
}

interface AddTagParams extends BaseTagParams {
    text: string;
    absoluteX: Date;
    absoluteY: number;
    color?: string;
}
interface AddMinMaxTagParams extends BaseTagParams {
    dataX: Date[];
    dataY: number[];
    color?: string;
    normalise?: boolean;
}

export const addMinMaxTag = (props: AddMinMaxTagParams) => {
    // Initiate the min and max accumulators for both X and Y
    let minArr: [Date, number] = [props.dataX[0], props.dataY[0]];
    let maxArr: [Date, number] = [props.dataX[0], props.dataY[0]];

    props.dataY.map((value: number, index: number) => {
        if (value > maxArr[1]) {
            maxArr[1] = value;
            maxArr[0] = props.dataX[index];
        }
        if (value < minArr[1]) {
            minArr[1] = value;
            minArr[0] = props.dataX[index];
        }
    });

    const tagColor = props.color ?? 'white';
    const minTagName = `Lo: $${determineNumericalFormat(minArr[1])}`;
    const maxTagName = `Hi: $${determineNumericalFormat(maxArr[1])}`;

    const baseKwargs = {
        baseId: props.baseId,
        x: props.x,
        y: props.y,
    };

    // The max and min values will always be 0 and 1 on a normalised axis
    if (props.normalise) {
        minArr[1] = 0;
        maxArr[1] = 1;
    }

    addTag({
        ...baseKwargs,
        text: minTagName,
        absoluteX: minArr[0],
        absoluteY: minArr[1],
        color: tagColor,
    });
    addTag({
        ...baseKwargs,
        text: maxTagName,
        absoluteX: maxArr[0],
        absoluteY: maxArr[1],
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
    const moveTo = `${props.x(props.absoluteX)} ${props.y(props.absoluteY)}`;
    let tagDraw: string;

    let offsetX: number = 20;
    let offsetY: number = 20;
    let textOffsetX: number;

    if (props.x(props.absoluteX) + 200 > props.x(props.x.domain()[props.x.domain().length - 1])) {
        // We change to a left facing tag if the x position of the tag is close to the right axis
        tagDraw = `M ${moveTo} l -6,-6 h -${tagLength} v ${tagWidth} h ${tagLength}`;
        offsetX *= -1;
        textOffsetX = offsetX - tagLength;
    } else {
        // We change to a right facing tag
        tagDraw = `M ${moveTo} l 6,-6 h ${tagLength} v ${tagWidth} h -${tagLength}`;
        textOffsetX = offsetX + 10;
    }
    if (props.y(props.absoluteY) < props.y(props.y.domain()[0]) / 2) {
        offsetY *= -1;
    }

    tag.append('path')
        .attr('d', tagDraw)
        .attr('transform', `translate(${offsetX}, ${offsetY})`)
        .attr('fill', color)
        .attr('z-index', 999);

    tag.append('circle')
        .attr('cx', props.x(props.absoluteX))
        .attr('cy', props.y(props.absoluteY))
        .attr('r', 3)
        .attr('fill', color);

    tag.append('line')
        .attr('x1', props.x(props.absoluteX))
        .attr('y1', props.y(props.absoluteY))
        .attr('x2', props.x(props.absoluteX) + offsetX)
        .attr('y2', props.y(props.absoluteY) + offsetY)
        .attr('stroke-width', 1)
        .attr('stroke', color);

    tag.append('text')
        .attr('x', props.x(props.absoluteX) + textOffsetX)
        .attr('y', props.y(props.absoluteY) + (offsetY + tagWidth / 3))
        .text(props.text)
        .attr('font-size', typographyTheme.subtitle2.fontSize);
};
