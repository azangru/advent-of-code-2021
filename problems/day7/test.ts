import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";
import { solve1 } from './part1.ts';
import { solve2, findFuelForDistance } from './part2.ts';

const example1 = '16,1,2,0,4,2,7,1,2,14';


Deno.test("solve1", () => {
  assertEquals(solve1(example1), { position: 2, fuelSpent: 37 });
});


Deno.test({
  name: 'findFuelForDistance',
  fn: () => {
    assertEquals(findFuelForDistance(16, 5), 66);
    assertEquals(findFuelForDistance(1, 5), 10);
    assertEquals(findFuelForDistance(2, 5), 6);
    assertEquals(findFuelForDistance(0, 5), 15);
    assertEquals(findFuelForDistance(4, 5), 1);
    assertEquals(findFuelForDistance(7, 5), 3);
    assertEquals(findFuelForDistance(14, 5), 45);
  }
});

Deno.test({
  name: 'solve2',
  fn: () => {
    assertEquals(solve2(example1), { position: 5, fuelSpent: 168 });
  }
});
