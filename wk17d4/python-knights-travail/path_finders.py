from tree import Node


class KnightPathFinder:
    def __init__(self, position):
        self._x, self._y = position
        self._root = Node(position)
        self._considered_positions = set()

    def get_valid_moves(self, pos):
        # (x,y) -> (x+-1, y+-2 ), (x+-2, y+-1 )
        # as long as x,y is > -1 and < 8
        finalSet = set()
        x, y = pos
        finalSet.add((x + 1, y + 2))
        finalSet.add((x - 1, y - 2))
        finalSet.add((x - 1, y + 2))
        finalSet.add((x + 1, y - 2))
        finalSet.add((x + 2, y + 1))
        finalSet.add((x - 2, y - 1))
        finalSet.add((x - 2, y + 1))
        finalSet.add((x + 2, y - 1))

        return {i for i in finalSet if i[0] > -1 and i[0] < 8 and i[1] > -1 and i[1] < 8}

    def new_move_positions(self, pos):
        valid_moves = self.get_valid_moves(pos)
        self._considered_positions = valid_moves | self._considered_positions
        return self._considered_positions

    def build_move_tree(self):
        visited = set()
        node_array = [self._root]
        while len(node_array):
            current_node = node_array.pop(0)
            if current_node.value not in visited:
                visited.add(current_node.value)
                new_moves = self.new_move_positions(current_node.value)
                for i in new_moves:
                    current_node.add_child(Node(i))
                node_array.extend(current_node.children)

    def find_path(self, end_position):
        end_point = self._root.breadth_search(end_position)
        return self.trace_to_root(end_point)

    def trace_to_root(self, end_node):
        path = [end_node]
        node = end_node
        while node is not self._root:
            path.append(node.parent)
            node = node.parent
        return list(reversed(path))


# finder = KnightPathFinder((0, 0))
# print(finder.new_move_positions((0, 0)))
# print(finder.new_move_positions((0, 0)))

# finder = KnightPathFinder((0, 0))
# finder.build_move_tree()
# print("Root's Children: ", finder._root.children)
# print("Root's first child's children: ", finder._root.children[0].children)
# print(finder._root.children)
# print(finder._root.children[0].children)
# print(finder._root.children[0].children[0].children)
# print(finder._root.children[0].children[0].children)
# print(finder.trace_to_root(finder._root.children[0].children[0].children[0]))
# print(finder.trace_to_root(finder._root.children[0].children[0]))

finder = KnightPathFinder((0, 0))
finder.build_move_tree()
print(finder.find_path((2, 1)))  # => [(0, 0), (2, 1)]
print(finder.find_path((3, 3)))  # => [(0, 0), (2, 1), (3, 3)]
print(finder.find_path((6, 2)))  # => [(0, 0), (1, 2), (2, 4), (4, 3), (6, 2)]
# => [(0, 0), (1, 2), (2, 4), (4, 3), (5, 5), (7, 6)]
print(finder.find_path((7, 6)))
