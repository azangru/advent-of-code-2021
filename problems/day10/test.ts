import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";
import { solve1 } from './part1.ts';
import { solve2 } from './part2.ts';

const example1 = `
[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]
`.trim();


Deno.test("solve1", () => {
  assertEquals(solve1(example1), 26397);
});

Deno.test({
  name: 'solve2',
  fn: () => {
    assertEquals(solve2(example1), 288957);
  }
});
