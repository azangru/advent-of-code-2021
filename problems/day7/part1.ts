export const solve1 = (input: string) => {
  const positions = input.split(',').map(number => parseInt(number));
  return findClosestPosition(positions);
};

const findClosestPosition = (positions: number[]) => {
  let candidate = -1;
  let candidateFuel = Infinity;

  for (const position of positions) {
    const totalFuel = findSumOfDistancesFromPosition(position, positions);
    if (totalFuel < candidateFuel) {
      candidate = position;
      candidateFuel = totalFuel;
    }
  }

  return { position: candidate, fuelSpent: candidateFuel };
};

const findSumOfDistancesFromPosition = (p: number, positions: number[]) => {
  return positions.reduce((acc, position) => acc + Math.abs(position - p), 0);
};
