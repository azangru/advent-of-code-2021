export const solve2 = (input: string) => {
  const grid = parseInput(input);
  const lowPointCoordinates = findLowPointCoordinates(grid);
  const basins = lowPointCoordinates.map(coordinates => findBasin(grid, coordinates));
  const sortedBasins = [...basins].sort((a, b) => b.length - a.length);
  const threeLargestBasins = sortedBasins.slice(0, 3);
  
  return threeLargestBasins.reduce((acc, basin) => acc * basin.length, 1);
};

const parseInput = (input: string) => {
  return input.split('\n')
    .map(line => line.split('').map(number => parseInt(number)));
};

const findLowPointCoordinates = (grid: number[][]) => {
  const result = [];

  for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
    for (let columnIndex = 0; columnIndex < grid[rowIndex].length; columnIndex++) {
      const point = grid[rowIndex][columnIndex];
      const left = grid[rowIndex]?.[columnIndex - 1];
      const right = grid[rowIndex]?.[columnIndex + 1];
      const above = grid[rowIndex - 1]?.[columnIndex];
      const below = grid[rowIndex + 1]?.[columnIndex];

      const comparisons = [left, right, above, below].filter(x => typeof x === 'number');

      if (comparisons.every(comp => comp > point)) {
        result.push({ rowIndex, columnIndex });
      }
    }
  }

  return result;
};

const findBasin = (grid: number[][], coordinates: { rowIndex: number, columnIndex: number }) => {
  const visitedCoordinates = new Set<string>();
  const basin = [coordinates];
  const stack = [coordinates];

  while (stack.length) {
    const { rowIndex, columnIndex } = stack.pop() as { rowIndex: number, columnIndex: number };
    const point = grid[rowIndex][columnIndex];

    const surrounding = [
      { rowIndex: rowIndex + 1, columnIndex },
      { rowIndex: rowIndex - 1, columnIndex },
      { rowIndex, columnIndex: columnIndex + 1 },
      { rowIndex, columnIndex: columnIndex - 1 }
    ];

    for (const coordinates of surrounding) {
      const { rowIndex, columnIndex } = coordinates;
      const candidatePoint = grid[rowIndex]?.[columnIndex];
      const stringifiedCoordinates = `${rowIndex}${columnIndex}`;
      if (candidatePoint && !visitedCoordinates.has(stringifiedCoordinates) && candidatePoint > point && candidatePoint !== 9) {
        visitedCoordinates.add(stringifiedCoordinates);
        basin.push(coordinates);
        stack.push(coordinates);
      }
    }

  }

  return basin;
};
