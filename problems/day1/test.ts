import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";
import { numberOfIncreases, numberOfIncreasesWithSlidingWindow } from './logic.ts';

const example1 = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];

Deno.test("numberOfIncreases", () => {
  assertEquals(numberOfIncreases(example1), 7);
});

Deno.test("numberOfIncreasesWithSlidingWindow", () => {
  assertEquals(numberOfIncreasesWithSlidingWindow(example1), 5);
});
