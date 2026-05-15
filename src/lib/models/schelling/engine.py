"""
Schelling segregation model.

Schelling, T. C. (1971). Dynamic Models of Segregation.
Journal of Mathematical Sociology, 1, 143-186.

Two-type agents on a square lattice. An agent is unsatisfied when the
fraction of its same-type Moore (8-cell) neighbors falls below the
tolerance threshold. At each step, one uniformly random unsatisfied
agent moves to a uniformly random empty cell.
"""

import random


class Schelling:
    def __init__(self, size: int, density: float, tolerance: float, seed: int = 1):
        self.size = size
        self.density = density
        self.tolerance = tolerance
        self.rng = random.Random(seed)
        self.grid = [[0] * size for _ in range(size)]
        self._populate()

    def _populate(self) -> None:
        for y in range(self.size):
            for x in range(self.size):
                if self.rng.random() < self.density:
                    self.grid[y][x] = 1 if self.rng.random() < 0.5 else 2
                else:
                    self.grid[y][x] = 0

    def step(self) -> None:
        unsatisfied = self._find_unsatisfied()
        if not unsatisfied:
            return
        empties = [
            (x, y)
            for y in range(self.size)
            for x in range(self.size)
            if self.grid[y][x] == 0
        ]
        if not empties:
            return
        ax, ay = self.rng.choice(unsatisfied)
        tx, ty = self.rng.choice(empties)
        self.grid[ty][tx] = self.grid[ay][ax]
        self.grid[ay][ax] = 0

    def reset(self, seed: int) -> None:
        self.rng = random.Random(seed)
        self._populate()

    def _like_fraction(self, x: int, y: int) -> float:
        t = self.grid[y][x]
        if t == 0:
            return 1.0
        like = 0
        total = 0
        for dy in (-1, 0, 1):
            for dx in (-1, 0, 1):
                if dx == 0 and dy == 0:
                    continue
                nx, ny = x + dx, y + dy
                if not (0 <= nx < self.size and 0 <= ny < self.size):
                    continue
                n = self.grid[ny][nx]
                if n == 0:
                    continue
                total += 1
                if n == t:
                    like += 1
        return 1.0 if total == 0 else like / total

    def _find_unsatisfied(self) -> list[tuple[int, int]]:
        return [
            (x, y)
            for y in range(self.size)
            for x in range(self.size)
            if self.grid[y][x] != 0 and self._like_fraction(x, y) < self.tolerance
        ]

    def segregation_index(self) -> float:
        total = 0
        s = 0.0
        for y in range(self.size):
            for x in range(self.size):
                if self.grid[y][x] != 0:
                    total += 1
                    s += self._like_fraction(x, y)
        return 0.0 if total == 0 else s / total

    def unsatisfied_count(self) -> int:
        return len(self._find_unsatisfied())

    def agent_count(self) -> int:
        return sum(
            1
            for y in range(self.size)
            for x in range(self.size)
            if self.grid[y][x] != 0
        )


if __name__ == "__main__":
    sim = Schelling(size=50, density=0.9, tolerance=0.4, seed=1)
    for _ in range(5000):
        sim.step()
    print(f"agents: {sim.agent_count()}")
    print(f"unsatisfied: {sim.unsatisfied_count()}")
    print(f"segregation index: {sim.segregation_index():.4f}")
