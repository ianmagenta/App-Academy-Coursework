class Node:
    def __init__(self, value):
        self._value = value
        self._parent = None
        self._children = []

    @property
    def value(self):
        return self._value

    @property
    def children(self):
        return self._children

    def add_child(self, node):
        if node not in self._children:
            self._children.append(node)
            node.parent = self

    def remove_child(self, node):
        if node in self._children:
            node.parent = None
            self._children.remove(node)

    @property
    def parent(self):
        return self._parent

    @parent.setter
    def parent(self, new_parent):
        if self._parent == new_parent:
            return

        if new_parent == None:
            self._parent = None
            return

        if self._parent:
            self._parent.remove_child(self)

        if new_parent is not None:
            self._parent = new_parent
            self._parent.add_child(self)

    def depth_search(self, value, visited=set()):
        if self not in visited:
            visited.add(self)
            for child in self.children:
                final_val = child.depth_search(value, visited)
                if final_val:
                    return final_val
            if self._value == value:
                return self
        return None

        # if self._value == value:
        #     return self
        # if self not in visited:
        #     visited.add(self)
        #     for child in self._children:
        #         child.depth_search(value, visited)

    def breadth_search(self, value):
        visited = set()
        nodeArray = [self]

        while len(nodeArray):
            currentNode = nodeArray.pop(0)
            if currentNode not in visited:
                visited.add(currentNode)
                if currentNode.value == value:
                    return currentNode
                nodeArray.append(*currentNode.children)

            # if queue[0].value == value:
            #     return queue[0]
            # queue.append(queue[0]._children)
            # queue.pop(0)

#  graph = {
#   'A' : ['B','C'],
#   'B' : ['D', 'E'],
#   'C' : ['F'],
#   'D' : [],
#   'E' : ['F'],
#   'F' : []
# }

# visited = [] # List to keep track of visited nodes.
# queue = []     #Initialize a queue

# def bfs(visited, graph, node):
#   visited.append(node)
#   queue.append(node)

#   while queue:
#     s = queue.pop(0)
#     print (s, end = " ")

#     for neighbour in graph[s]:
#       if neighbour not in visited:
#         visited.append(neighbour)
#         queue.append(neighbour)

# # Driver Code
# bfs(visited, graph, 'A')
##################################
# graph = {
#     'A' : ['B','C'],
#     'B' : ['D', 'E'],
#     'C' : ['F'],
#     'D' : [],
#     'E' : ['F'],
#     'F' : []
# }

# visited = set() # Set to keep track of visited nodes.
# def dfs(visited, graph, node):
#     if node not in visited:
#         print (node)
#         visited.add(node)
#         for neighbour in graph[node]:
#             dfs(visited, graph, neighbour)
