export const solve2 = (input: string) => {
  const positions = input.split(',').map(number => parseInt(number));
  return findClosestPosition(positions);
};

const findClosestPosition = (positions: number[]) => {
  const { min, max } = getFullRange(positions);

  let candidate = -1;
  let candidateFuel = Infinity;

  for (let i = min; i <= max; i++) {
    const totalFuel = findSumOfDistancesFromPosition(i, positions);
    if (totalFuel < candidateFuel) {
      candidate = i;
      candidateFuel = totalFuel;
    }
  }

  return { position: candidate, fuelSpent: candidateFuel };
};

const findSumOfDistancesFromPosition = (p: number, positions: number[]) => {
  return positions.reduce((acc, position) => {
    const fuel = findFuelForDistance(position, p);
    return acc + fuel;
  }, 0);
};

const getFullRange = (positions: number[]) => {
  const min = Math.min.apply(null, positions);
  const max = Math.max.apply(null, positions);
  return { min, max };
};

// Brute-forcing it... There must be a clean mathematical formula for this
export const findFuelForDistance = (position1: number, position2: number) => {
  let fuel = 0;
  const distance = Math.abs(position1 - position2);

  for (let i = 0; i < distance; i++) {
    fuel += i + 1;
  }

  return fuel;
};
