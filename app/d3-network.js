/**
 * Created by Taehyun on 2016-09-23.
 */
import './common'

import 'd3-collection'
import 'd3-dispatch'
import 'd3-quadtree'
import 'd3-timer'
import 'd3-force'
import d3tip from 'd3-tip'

import genData from './data'


let container = $("#network-container").empty(),
    simulation;


let width = container.width(),
    height = container.height();

let svg;

let color = d3.scaleOrdinal(d3.schemeCategory20);



$(window).on("resize", resize);

function resize() {
    let width = container.width(),
        height = container.height();

    svg.attr("width", width);
    svg.attr("height", height);
}

$("#draw").click(()=>{
    container.empty();
    svg = d3.select("#network-container")
        .append("svg");
    drawNetwork($("#num-elements").val());
});

function drawNetwork(numData) {
    resize();

    let data = genData(numData);

    simulation = d3.forceSimulation(data.nodes)
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force("charge", d3.forceManyBody())
        .force("link", d3.forceLink(data.edges))
        .on('tick', ticked);


    // Edge Tooltip
    let edgeTooltip = d3tip()
        .attr("class", "d3-tip")
        .html((d)=>d.source.id + " > " + d.target.id + "<br/>" + d.value);

    let edge = svg.append("g")
        .attr("class", "edges")
        .selectAll("line")
        .data(data.edges)
        .enter().append("line")
        .call(edgeTooltip)
        .on("mouseover", edgeTooltip.show)
        .on("mouseout", edgeTooltip.hide);

    // Node Tooltip
    let nodeTooltip = d3tip()
        .attr("class", "d3-tip")
        .html((d)=>d.id);

    let node = svg.append("g")
        .attr("class", "nodes")
        .selectAll("circle")
        .data(data.nodes)
        .enter().append("circle")
        .attr("r", 5)
        .attr("fill", (d)=>color(d.group))
        .call(d3.drag()
            .on("start", onDragStart)
            .on("drag", onDrag)
            .on("end", onDragEnd))
        .call(nodeTooltip)
        .on("mouseover", nodeTooltip.show)
        .on("mouseout", nodeTooltip.hide);

    node.append("title")
        .text((d)=>d.id);

    simulation
        .nodes(data.nodes)
        .on("tick", ticked);

    simulation.force("link")
        .links(data.edges);

    function ticked() {
        edge
            .attr("x1", (d)=>d.source.x)
            .attr("y1", (d)=>d.source.y)
            .attr("x2", (d)=>d.target.x)
            .attr("y2", (d)=>d.target.y);

        node
            .attr("cx", (d)=>d.x)
            .attr("cy", (d)=>d.y);
    }
}

function onDragStart(d) {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
}

function onDrag(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
}

function onDragEnd(d) {
    if (!d3.event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
}