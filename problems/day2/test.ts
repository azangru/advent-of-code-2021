import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";
import { solve1 } from './part1.ts';
import { solve2 } from './part2.ts';

const example1 = [
  'forward 5',
  'down 5',
  'forward 8',
  'up 3',
  'down 8',
  'forward 2'
];


Deno.test("solve1", () => {
  assertEquals(solve1(example1), 150);
});

Deno.test("solve2", () => {
  assertEquals(solve2(example1), 900);
});
