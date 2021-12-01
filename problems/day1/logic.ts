export const numberOfIncreases = (numbers: number[]) => {
  return numbers.reduce((accumulator, number, index): number => {
    const shouldIncrement = index > 0 && number > numbers[index-1];
    return shouldIncrement ? accumulator + 1 : accumulator;
  }, 0); 
};

export const numberOfIncreasesWithSlidingWindow = (numbers: number[]) => {
  let result = 0;
  let lastSum = null;
  for (let i = 2; i < numbers.length; i++) {
    const start = i - 2;
    const end = i + 1;
    const slice = numbers.slice(start, end);
    const sum = slice.reduce((acc, num) => acc + num, 0);
    if (typeof lastSum === 'number' && sum > lastSum) {
      result++;
    }
    lastSum = sum;
  }
  return result;
};
