import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";
import { parseInput } from './parseInput.ts';
import { solve1, Paper as Paper1 } from './part1.ts';

const example1 = `
6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0

fold along y=7
fold along x=5
`;


Deno.test("Paper1, initialization", () => {
  const { pointCoortinates } = parseInput(example1);
  const paper = new Paper1(pointCoortinates);

  const initialGrid = `
  ...#..#..#.
  ....#......
  ...........
  #..........
  ...#....#.#
  ...........
  ...........
  ...........
  ...........
  ...........
  .#....#.##.
  ....#......
  ......#...#
  #..........
  #.#........
  `.trim().split('\n').map(line => line.trim()).join('\n');

  assertEquals(paper.toString(), initialGrid);
});

Deno.test("Paper1, fold 1", () => {
  const { pointCoortinates, commands } = parseInput(example1);
  const paper = new Paper1(pointCoortinates);
  paper.foldAt(commands[0]);

  const expectedGrid = `
  #.##..#..#.
  #...#......
  ......#...#
  #...#......
  .#.#..#.###
  ...........
  ...........
  `.trim().split('\n').map(line => line.trim()).join('\n');

  // console.log(paper.toString());

  assertEquals(paper.toString(), expectedGrid);
});

Deno.test("Paper1, fold 2", () => {
  const { pointCoortinates, commands } = parseInput(example1);
  const paper = new Paper1(pointCoortinates);
  paper.foldAt(commands[0]);
  paper.foldAt(commands[1]);

  const expectedGrid = `
  #####
  #...#
  #...#
  #...#
  #####
  .....
  .....
  `.trim().split('\n').map(line => line.trim()).join('\n');

  assertEquals(paper.toString(), expectedGrid);
});

Deno.test('solve1', () => {
  assertEquals(solve1(example1), 17);
});
