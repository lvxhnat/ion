import * as d3 from 'd3'

export const removeToolTip = () => {
    d3.select("#tooltip-focus").remove()
    d3.selectAll("#linechart-tooltip").remove()
    d3.selectAll("#tooltip-rect").remove()
}