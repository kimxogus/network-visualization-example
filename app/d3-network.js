/**
 * Created by Taehyun on 2016-09-23.
 */
import './common'

import 'd3-collection'
import 'd3-dispatch'
import 'd3-quadtree'
import 'd3-timer'
import 'd3-force'
import 'd3-color'
import 'd3-ease'
import 'd3-selection'
import 'd3-transition'
import 'd3-drag'
import 'd3-zoom'
import d3tip from 'd3-tip'

import {genData, miserables} from './data'


let container = $("#network-container").empty(),
    simulation;


let width, height;

let svg;

let color = d3.scaleOrdinal(d3.schemeCategory20);


// resized svg
resize();
$(window).on("resize", resize);

function resize() {
    container.width($("#header").width());

    width = container.width();
    height = container.height();

    if(svg) {
        svg.attr("width", width);
        svg.attr("height", height);
    }
}

// clear svg and redraw
$("#draw").click(()=>{
    container.empty();
    svg = d3.select("#network-container")
        .append("svg");
    drawNetwork($("#num-elements").val());
});

function drawNetwork(numData) {
    resize();

    // Generate Data
    let data = genData(numData);

    // Simulate data
    simulation = d3.forceSimulation(data.nodes)
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force("charge", d3.forceManyBody())
        .force("link", d3.forceLink(data.edges))
        .on('tick', ticked);

    let g = svg.append("g").attr("transform", "translate(5,5) scale(1)");

    // Zoom behavior
    let zoom = d3.zoom()
        .scaleExtent([0.01, 10])
        .on("zoom", ()=>{
            g.attr("transform", d3.event.transform);
        });
    svg.call( zoom);


    // Edge Tooltip
    let edgeTooltip = d3tip()
        .attr("class", "d3-tip")
        .html((d)=>d.source.id + " > " + d.target.id + "<br/>" + d.value);

    let edge = g.append("g")
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

    let node = g.append("g")
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