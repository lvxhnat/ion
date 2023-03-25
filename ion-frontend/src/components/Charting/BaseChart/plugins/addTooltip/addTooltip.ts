import * as d3 from "d3";
import { ColorsEnum } from "common/theme";
import { CHARTCONFIGS, CHARTIDS } from "../../config";
import { DefaultDataProps } from "../../schema/schema";
import { returnChartAxis } from "../../BaseChart";

function formatDateString(d: Date) {
    const zeroPad = (n: number) => `${`0${n + 1}`.slice(-2)}`;
    return `${zeroPad(d.getDate())}/${zeroPad(
        d.getMonth()
    )}/${d.getFullYear()} ${zeroPad(d.getHours())}:${zeroPad(d.getMinutes())}`;
}

/**
 * Add a hover listener to the chart we wish to track
 * @param props
 */
export const addChartHoverListener = (props: { baseId: string }) => {
    const svg = d3.selectAll(props.baseId);
};

export const addToolTip = (props: {
    baseId: string;
    tooltipId: string;
    data: DefaultDataProps;
}) => {
    const svg = d3.selectAll(`#${props.baseId}`);
    const bisect = d3.bisector((d: any) => d).left;

    const nameWrapper = (name: string) => `${props.baseId}_${name}_${props.tooltipId}`;

    const groupClassname: string = nameWrapper(CHARTIDS.TOOLTIP_FOCUS_CLASS);
    const lineClassname: string = nameWrapper(CHARTIDS.TOOLTIP_LINE_CLASS);
    const mousetrackerClassname: string = nameWrapper(CHARTIDS.TOOLTIP_ENCOMPASSING_RECT_CLASS);

    const width: number = document.getElementById(props.baseId)!.parentNode!.parentElement!.clientWidth;
    const height: number = document.getElementById(props.baseId)!.parentNode!.parentElement!.clientHeight;

    const dates = props.data.dataX;

    const { x, y } = returnChartAxis({
        baseId: props.baseId,
        dataX: props.data.dataX,
        dataY: props.data.dataY,
        zeroAxis: false,
    });
    const focus = svg.append("g").attr("class", groupClassname)

    svg
        .append("rect")
        .attr("class", mousetrackerClassname)
        .style("fill", "transparent")
        .style("pointer-events", "all")
        .attr("width", width)
        .attr("height", height)
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseout", mouseout);

    focus
        .append("line")
        .attr("class", `${lineClassname}_y`)
        .style("stroke", ColorsEnum.white)
        .style("stroke-dasharray", "1,1")
        .style("stroke-width", CHARTCONFIGS.DEFAULT_LINE_STROKE_WIDTH)
        .style("opacity", 0.5)
        .attr("y1", 0)
        .attr("y2", height);

    focus
        .append("line")
        .attr("class", `${lineClassname}_x`)
        .style("stroke", ColorsEnum.white)
        .style("stroke-dasharray", "1,1")
        .style("stroke-width", CHARTCONFIGS.DEFAULT_LINE_STROKE_WIDTH)
        .style("opacity", 0.5)
        .attr("x1", 0)
        .attr("x2", width);

    function mouseover() { focus.style("opacity", 1) }
    function mouseout() { focus.style("opacity", 0) }
    function mousemove(e: MouseEvent) {
        const x0 = x.invert(d3.pointer(e, svg.node())[0]);
        const i = bisect(dates, x0, 1);

        if (dates[i]) {
            const xTranslate = x(dates[i]);
            const yTranslate = y(props.data.dataY[i])

            focus
                .selectAll(`.${lineClassname}_y`)
                .attr("transform", `translate(${xTranslate}, 0)`);

            focus
                .selectAll(`.${lineClassname}_x`)
                .attr("transform", `translate(0, ${yTranslate})`);
        }
    }
}