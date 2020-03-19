function breadthFirstSearch(startingNode, targetVal) {
    let visited = new Set();
    let nodeArray = [startingNode];

    while(nodeArray.length) {
        let currentNode = nodeArray.shift();
        if (!visited.has(currentNode)) {
            visited.add(currentNode);
            if (currentNode.val === targetVal) {
                return currentNode;
            }
            nodeArray.push(...currentNode.neighbors);
        }
    }
    return null;
}

module.exports = {
    breadthFirstSearch
};
