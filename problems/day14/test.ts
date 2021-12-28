import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";
import { solve1, Chain as Chain1 } from './part1.ts';
// import { solve2 } from './part2.ts';

const example1 = `
NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C
`;

Deno.test("Chain1", () => {
  let chain = new Chain1(example1);
  chain.runSteps(1);
  assertEquals(chain.toString(), 'NCNBCHB');

  chain = new Chain1(example1);
  chain.runSteps(2);
  assertEquals(chain.toString(), 'NBCCNBBBCBHCB');

  chain = new Chain1(example1);
  chain.runSteps(3);
  assertEquals(chain.toString(), 'NBBBCNCCNBBNBNBBCHBHHBCHB');

  chain = new Chain1(example1);
  chain.runSteps(4);
  assertEquals(chain.toString(), 'NBBNBNBBCCNBCNCCNBBNBBNBBBNBBNBBCBHCBHHNHCBBCBHCB');
});

Deno.test("solve1", () => {
  assertEquals(solve1(example1), 1588);
});

// Deno.test({
//   name: 'solve2',
//   fn: () => {

//   }
// });
