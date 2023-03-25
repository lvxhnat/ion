import * as d3 from "d3";
import { ColorsEnum } from "common/theme";
import { CHARTCONFIGS, CHARTIDS } from "../../config";
import { DefaultDataProps } from "../../schema/schema";
import { OHLCDataSchema } from "data/schema/common";

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
    x: any;
    y: any;
    baseId: string;
    data: DefaultDataProps[];
}) => {
    const svg = d3.selectAll(props.baseId);
    const dates = props.data[0].dataX;
    const bisect = d3.bisector((d: any) => d).left;
    // If OHLC Data, we pick close
    let data: number[];
}