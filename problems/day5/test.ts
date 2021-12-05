import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";
import { solve1, solve2 } from './logic.ts';

const example1 = `
0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2
`.trim();


Deno.test("solve1", () => {
  assertEquals(solve1(example1), 5);
});

Deno.test({
  name: 'solve2',
  fn: () => {
    assertEquals(solve2(example1), 12);
  }
});
