/**
 * Idea: instead of counting the fish one by one,
 * keep track of the counts of fish at different day in their cycle.
 * Is this dynamic programming? I don't know. I had to hunt for this idea
 * on the internet.
 */


export const solve2 = (input: string, cycles: number) => {
  const timers = input.split(',').map((number) => parseInt(number));
  return runSimulation(timers, cycles);
};

const runSimulation = (input: number[], cycles: number) => {
  let fishMapByTimer = new Map<number, number>();
  input.forEach(number => {
    updateMap({ key: number, map: fishMapByTimer });
  });

  for (let i = 0; i < cycles; i++) {
    const newMap = new Map<number, number>();

    for (const [timer, value] of [...fishMapByTimer.entries()]) {
      if (timer === 0) {
        updateMap({ key: 8, value, map: newMap });
        updateMap({ key: 6, value, map: newMap });
      } else {
        updateMap({ key: timer - 1, value, map: newMap });
      }
    }

    fishMapByTimer = newMap;
  }

  return [...fishMapByTimer.values()].reduce((acc, val ) => acc + val, 0);
};

const updateMap = ({ key, value = 1, map }: { key: number, value?: number, map: Map<number, number> }) => {
  if (map.has(key)) {
    const updatedValue = map.get(key) as number + value;
    map.set(key, updatedValue);
  } else {
    map.set(key, value);
  }
};
