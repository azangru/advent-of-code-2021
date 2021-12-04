import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";
import { solve1, solve2 } from './logic.ts';

const example1 = [
  '00100',
  '11110',
  '10110',
  '10111',
  '10101',
  '01111',
  '00111',
  '11100',
  '10000',
  '11001',
  '00010',
  '01010'
];


Deno.test("solve1", () => {
  assertEquals(solve1(example1), 198);
});

Deno.test({
  name: 'solve2',
  fn: () => {
    assertEquals(solve2(example1), 230);
  }
});
