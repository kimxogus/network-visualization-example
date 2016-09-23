/**
 * Created by Taehyun on 2016-09-23.
 */
import './common'

import cytoscape from 'cytoscape'
import 'cytoscape-qtip'
import 'cytoscape-panzoom'

import genData from './data'


let cy;
let data;

let color = d3.scaleOrdinal(d3.schemeCategory20);


$("#draw").click(()=>{
    data = genData($("#num-elements").val() || 100);

    let option = {
        container: $("#network-container"),

        layout: {
            name: "spread",
            idealEdgeLength: 150
        },

        styles: [{
            selector: 'node',
            style: {
                'label': 'data(id)',

                'background-color': (node)=>color(node.data("group")),

                'text-outline-width': 2,
                'text-outline-color': "#ddd",
                'text-outline-opacity': 0.7
            }
        }, {
            selector: 'edge',
            style: {
                'label': 'data(value)',

                'curve-style': 'bezier',

                'edge-text-rotation': 'autorotate',

                'text-outline-width': 2,
                'text-outline-color': "#ddd",
                'text-outline-opacity': 0.7
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

    if(cy) {
        redrawNetwork(option);
    } else {
        drawNetwork(option);
    }
});

function drawNetwork(option) {
    cy = cytoscape(option);

    cy.panzoom();

    cy.nodes().qtip({
        content: 'data(id)',
        position: {
            my: 'top center',
            at: 'bottom center'
        }
    });
    cy.edges().qtip({
        content: (edge)=>edge.data("source") + " > " + edge.data("target") + "<br/>" + edge.data("value"),
        positoin: {
            my: 'top center',
            at: 'bottom center'
        }
    });
}

function redrawNetwork(option) {
    cy.elements().remove();
    cy.add(option.elements);
    cy.layout(option.layout);
}