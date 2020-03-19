function numRegions(graph) {
    let visited = new Set();
    let counter = 0;

    for (let node in graph) {
        if (_numRegions(node, graph, visited)) {
            counter++;
        }
    }

    return counter;
}

function _numRegions(node, graph, visited) {
    if (visited.has(node)) return false;
    visited.add(node);

    graph[node].forEach(n => {
        _numRegions(n, graph, visited);
    });

    return true;
}

module.exports = {
    numRegions
};
