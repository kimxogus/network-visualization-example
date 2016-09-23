import _ from "lodash"


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