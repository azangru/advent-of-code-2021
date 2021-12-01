import { readFileAsIntegers } from '../../utils/readfile.ts';
import { numberOfIncreases, numberOfIncreasesWithSlidingWindow } from './logic.ts';

const __dirname = new URL('.', import.meta.url).pathname;

const solvePart1 = async () => {
  const input = await(readFileAsIntegers(`${__dirname}input.txt`));
  return numberOfIncreases(input);
};

const solvePart2 = async () => {
  const input = await(readFileAsIntegers(`${__dirname}input.txt`));
  return numberOfIncreasesWithSlidingWindow(input);
};

console.log(await solvePart1());
console.log(await solvePart2());
