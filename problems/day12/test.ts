import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";
import { solve1 } from './part1.ts';
import { solve2 } from './part2.ts';


const example1 = `
start-A
start-b
A-c
A-b
b-d
A-end
b-end
`;

const example2 = `
dc-end
HN-start
start-kj
dc-start
dc-HN
LN-dc
HN-end
kj-sa
kj-HN
kj-dc
`;

const example3 = `
fs-end
he-DX
fs-he
start-DX
pj-DX
end-zg
zg-sl
zg-pj
pj-he
RW-he
fs-DX
pj-RW
zg-RW
start-pj
he-WI
zg-he
pj-fs
start-RW
`;


Deno.test("solve1", () => {
  assertEquals(solve1(example1), 10);
  assertEquals(solve1(example2), 19);
  assertEquals(solve1(example3), 226);
});


Deno.test({
  name: 'solve2',
  fn: () => {
    assertEquals(solve2(example1), 36);
    assertEquals(solve2(example2), 103);
    assertEquals(solve2(example3), 3509);
  }
});
