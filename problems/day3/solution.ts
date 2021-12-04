import { readFileAsLines } from '../../utils/readfile.ts';
import { solve1, solve2 } from './logic.ts';

const __dirname = new URL('.', import.meta.url).pathname;

const solvePart1 = async () => {
  const input = await(readFileAsLines(`${__dirname}input.txt`));
  return solve1(input);
};

const solvePart2 = async () => {
  const input = await(readFileAsLines(`${__dirname}input.txt`));
  return solve2(input);
};

console.log('Solution to the first part', await solvePart1());
console.log('Solution to the second part', await solvePart2());
