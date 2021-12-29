import { readFile } from '../../utils/readfile.ts';
import { solve1 } from './part1.ts';
import { solve2 } from './part2.ts';

const __dirname = new URL('.', import.meta.url).pathname;

const solvePart1 = async () => {
  const input = await(readFile(`${__dirname}input.txt`));
  return solve1(input);
};

const solvePart2 = async () => {
  const input = await(readFile(`${__dirname}input.txt`));
  return solve2(input);
};

console.log('Solution to the first part', await solvePart1());
console.log('Solution to the second part', await solvePart2());
