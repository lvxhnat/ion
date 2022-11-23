import { ColorsEnum } from 'common/theme';

// Nested Enums https://topherpedersen.blog/2021/06/07/nested-enums-in-typescript/
export const LINECHARTIDS = {
    XAXIS_ID: 'x-axis',
    YAXIS_ID: 'y-axis',
    DRAW_CONTAINER_ID: 'draw-rect', // rect class for containing all drawn lines
    DRAW_LINE_CLASS: 'drawLine', // class for lines drawn by "draw mode"
    ENDTAG_GROUP_ID: 'end-tags',
    LEGEND_GROUP_ID: 'legend',
    LEGEND_BOX_CLASS: 'legend-box',
    LEGEND_HINT_CLASS: 'parent-indicator',
    LEGEND_SQUARE_CLASS: 'legend-square',
    LEGEND_TEXT_CLASS: 'legend-text',
    LEGEND_VALUE_CLASS: 'legend-value',
    TOOLTIP_FOCUS_CLASS: 'tooltip-focus',
    TOOLTIP_CIRCLE_TRACKER_CLASS: 'tooltip-point-tracker',
    TOOLTIP_RECT_TRACKER_CLASS: 'tooltip-x-tracker',
    TOOLTIP_RECT_TEXT_CLASS: 'tooltip-x-tracker-text',
    TOOLTIP_LINE_CLASS: 'tooltip-x-line',
    TOOLTIP_ENCOMPASSING_RECT_CLASS: 'tooltip-rect',
};

export const CHARTCONFIGS = {
    DEFAULT_WIDTH: 960,
    DEFAULT_HEIGHT: 500,
    DEFAULT_MARGIN_TOP: 10,
    DEFAULT_MARGIN_RIGHT: 30,
    DEFAULT_MARGIN_BOTTOM: 20,
    DEFAULT_MARGIN_LEFT: 35,
    DEFAULT_DATA: [], // No additional data, plot only one line
    DEFAULT_CHART_FONTSIZE: '0.6rem',
    DEFAULT_SHOW_AVERAGE: false,
    DEFAULT_SHOW_GRID: false,
    DEFAULT_SHOW_AXIS: false,
    DEFAULT_SHOW_NORMALISED: false,
    DEFAULT_SHOW_LEGEND: false,
    DEFAULT_SHOW_TOOLTIP: false,
    DEFAULT_ZERO_AXIS: false,
    DEFAULT_DARKMODE_LINE_COLOR: ColorsEnum.white,
    DEFAULT_LIGHTMODE_LINE_COLOR: ColorsEnum.black,
    DEFAULT_LINE_AREA_COLOR: 'steelblue',
    DEFAULT_LINE_AREA_OPACITY: 0.4,
    DEFAULT_LINE_STROKE_WIDTH: 1.5,
    DEFAULT_TOOLTIP_FONTSIZE: '0.75rem',
    DEFAULT_DARKMODE_TOOLTIP_FONTCOLOR: ColorsEnum.white,
    DEFAULT_LIGHTMODE_TOOLTIP_FONTCOLOR: ColorsEnum.black,

    DEFAULT_LEGEND_BOX_SIZE: 10,
    DEFAULT_LEGEND_PARENT_TREE_BOX_SIZE: 5,
    DEFAULT_LEGEND_OPACITY: 0.7,
    DEFAULT_LEGEND_WIDTH: 220,
};
