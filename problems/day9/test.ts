import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";
import { solve1 } from './part1.ts';
import { solve2 } from './part2.ts';

const example1 = `
2199943210
3987894921
9856789892
8767896789
9899965678
`.trim();


Deno.test("solve1", () => {
  assertEquals(solve1(example1), 15);
});

Deno.test({
  name: 'solve2',
  fn: () => {
    console.log(solve2(example1));

    assertEquals(solve2(example1), 1134);
  }
});
