export const solve1 = (input: string, cycles: number) => {
  const timers = input.split(',').map((number) => parseInt(number));
  runSimulation(timers, cycles);
  return timers.length;
};

const runSimulation = (timers: number[], cycles: number) => {
  for (let i = 0; i < cycles; i++) {
    updateTimers(timers);
  }
};

const updateTimers = (timers: number[]) => {
  const newTimers = [];

  for (let i = 0; i < timers.length; i++) {
    if (timers[i] > 0) {
      timers[i]--;
    } else {
      timers[i] = 6;
      newTimers.push(8);
    }
  }

  for (const newTimer of newTimers) {
    timers.push(newTimer);
  }
};
