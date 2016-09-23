/**
 * Created by Taehyun on 2016-09-23.
 */
import './common'

import cytoscape from 'cytoscape'
import 'cytoscape-spread/src'
import 'cytoscape-cose-bilkent/src'
import 'cytoscape-ngraph.forcelayout/src'


import genData from './data'


let cy;

let color = d3.scaleOrdinal(d3.schemeCategory20);


// Sample Layouts
// refer to http://js.cytoscape.org/#extensions/layout-extensions
// Computing layout is very resource consuming process.
// Be careful to use 'cose-bilkent'. It takes a long time to draw thousands of elements.
const
    FORCE_LAYOUT    = 'cytoscape-ngraph.forcelayout',
    SPREAD_LAYOUT   = 'spread',
    COSE_BILKENT_LAYOUT = 'cose-bilkent';

let layouts = {
    [FORCE_LAYOUT]: {
        name: FORCE_LAYOUT,
        springLength: 150,
        springCoeff: 0.0001,
        gravity: -10
    },
    [SPREAD_LAYOUT]: {
        name: SPREAD_LAYOUT,
        idealEdgeLength: 150
    },
    [COSE_BILKENT_LAYOUT]: {
        name: COSE_BILKENT_LAYOUT,
        idealEdgeLength: 150
    }
};


$("#draw").click(()=>{
    let numElems = $("#num-elements").val() || 100;
    let data = genData(numElems);
    let nodeSize = 2000 / numElems || 2;

    let option = {
        container: $("#network-container"),

        layout: layouts[SPREAD_LAYOUT], // You can also put FORCE_LAYOUT or COSE_BILKENT_LAYOUT.

        style: [{
            selector: 'node',
            style: {
                'label': 'data(id)',

                'background-color': (node)=>color(node.data("group")),
                'width': nodeSize,
                'height': nodeSize,
                'border-width': nodeSize/10,

                'font-size': nodeSize/3,
                'text-outline-width': 1,
                'text-outline-color': "#ddd",
                'text-outline-opacity': 0.5
            }
        }, {
            selector: 'edge',
            style: {
                'label': 'data(value)',

                'width': nodeSize/10,
                'curve-style': 'bezier',

                'edge-text-rotation': 'autorotate',

                'font-size': nodeSize/5,
                'text-outline-width': 1,
                'text-outline-color': "#ddd",
                'text-outline-opacity': 0.5
            }
        }],

        elements: {
            nodes: data.nodes.map(node=>{
                return {data: node};
            }),
            edges: data.edges.map(edge=>{
                edge.source = edge.source.id;
                edge.target = edge.target.id;
                edge.id = edge.source + "_" + edge.target;
                return {data: edge};
            })
        }
    };

    // cytoscape should not be cleared for redrawing
    // If it's cleared and redrawn, its extension libraries may cause problems.
    // Such as cytoscape-redo-undo and so on...
    if(cy) {
        redrawNetwork(option);
    } else {
        drawNetwork(option);
    }
});

// resize canvas
$(window).resize(()=>{
    cy && cy.resize();
});

function drawNetwork(option) {
    cy = cytoscape(option);
}

function redrawNetwork(option) {
    cy.elements().remove();
    cy.add(option.elements);
    cy.layout(option.layout); // this triggers redrawing. Be careful for the order of commands.
}