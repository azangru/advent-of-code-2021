export const solve1 = (input: string) => {
  const lowPoints = findLowPoints(parseInput(input));

  return lowPoints.map(number => number + 1)
    .reduce((acc, number) => acc + number ,0);
};

const parseInput = (input: string) => {
  return input.split('\n')
    .map(line => line.split('').map(number => parseInt(number)));
};

const findLowPoints = (grid: number[][]) => {
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
        result.push(point);
      }
    }
  }

  return result;
};
