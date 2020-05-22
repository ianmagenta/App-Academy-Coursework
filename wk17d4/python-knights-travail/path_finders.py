from tree import Node


class KnightPathFinder:
    def __init__(self, position):
        self._x, self._y = position
        self._root = Node(position)
        self._considered_positions = {position}

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


finder = KnightPathFinder((0, 0))
print(finder.new_move_positions((0, 0)))
print(finder.new_move_positions((0, 0)))
