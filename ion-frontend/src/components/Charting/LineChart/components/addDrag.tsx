import * as d3 from 'd3';

export const addDrag = (props: {
    x: any,
    y: any,
    svg: d3.Selection<SVGElement, {}, HTMLElement, any>,
}) => {

    const svg = props.svg;

    svg.on("mousedown", () => {
        console.log("mousedown!")
        highlightRange()
    })

    function highlightRange() {
        svg.append("rect")
            .attr("class", "rectangle")
            .call(dragRect)
    }

    const dragRect: any = d3.drag().on("drag", (e) => {
        console.log()
    })
}