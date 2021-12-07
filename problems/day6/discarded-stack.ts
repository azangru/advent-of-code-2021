// Attempt to count the fish using a stack to prevent running out of memory.
// Didn't work out, because it took too much time to count each fish indiividually

type Fish = {
  delay: number;
  day: number;
}

export const solve2 = (input: string, cycles: number) => {
  const stack = input.split(',')
    .map((number) => parseInt(number))
    .map((number) => ({ delay: number, day: cycles }));
  return runSimulation(stack);
};

const runSimulation = (stack: Fish[]) => {
  let fishCount = 0;
  while (stack.length) {
    const fish = stack.pop() as Fish;
    const fishChildren = collectFishChildren(fish);
    for (const fish of fishChildren) {
      stack.push(fish);
    }
    fishCount++;
  }

  return fishCount;
};

const collectFishChildren = (fish: Fish) => {
  const { delay, day } = fish;

  // a fish spawns a new one on the day following the one when the counter is down to 0
  const firstGenerationDay = day - delay - 1; // at this point, a fish enters a regular 7-day cycle

  const generationsCount = Math.floor(firstGenerationDay / 7) + 1; // it produces a new fish every 7th day

  const children = [];

  for (let i = 0; i < generationsCount; i++) {
    const birthDay = firstGenerationDay - 7 * i;
    children.push({ delay: 8, day: birthDay });
  }

  return children;
};
