import _ from "lodash"

/*
 Generate random nodes and edges
 the ratio of nodes and edges is 1:2

  Example data
  ////////////
  {
    nodes: [{
        index: 10,
        id: 'node10',
        group: 3
    }],
    edges: [{
        source: {
            index: 5,
            id: 'node5',
            group: 2
        },
        target: {
            index: 10,
            id: 'node10',
            group: 3
        },
        value: 5
    }]
  }
  ////////////
 */

export default function genData(num) {
    let nodes = [],
        edges = [];

    let numNodes = Math.floor(num / 3),
        numEdges = numNodes * 2;

    for (let i = 0; i < numNodes; i++) {
        nodes.push({
            index: i,
            id: 'node' + i,
            group: _.random(0, 10, 0)
        });
    }

    for (let i = 0; i < numEdges; i++) {
        edges.push({
            source: getNode(),
            target: getNode(),
            value: _.random(0, 10, false)
        });
    }

    function getNode() {
        let idx;
        do{
            idx = Math.floor(_.random(numNodes-1));
        } while(!nodes[idx]);
        return nodes[idx];
    }

    return {
        nodes, edges
    }
}