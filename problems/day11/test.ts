import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";
import { solve1, Grid as Grid1 } from './part1.ts';
import { solve2, Grid as Grid2 } from './part2.ts';

// initial state
const simpleExample1 = `
11111
19991
19191
19991
11111
`.trim();

// after step 1
const simpleExample1_1 = `
34543
40004
50005
40004
34543
`.trim();

// after step 2
const simpleExample1_2 = `
45654
51115
61116
51115
45654
`.trim();

// initial state
const example1 = `
5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526
`.trim();

const example1_step1 = `
6594254334
3856965822
6375667284
7252447257
7468496589
5278635756
3287952832
7993992245
5957959665
6394862637
`.trim();

const example1_step2 = `
8807476555
5089087054
8597889608
8485769600
8700908800
6600088989
6800005943
0000007456
9000000876
8700006848
`.trim();

const example1_step3 = `
0050900866
8500800575
9900000039
9700000041
9935080063
7712300000
7911250009
2211130000
0421125000
0021119000
`.trim();

const example1_step4 = `
2263031977
0923031697
0032221150
0041111163
0076191174
0053411122
0042361120
5532241122
1532247211
1132230211
`.trim();

const example1_step5 = `
4484144000
2044144000
2253333493
1152333274
1187303285
1164633233
1153472231
6643352233
2643358322
2243341322
`.trim();

const example1_step6 = `
5595255111
3155255222
3364444605
2263444496
2298414396
2275744344
2264583342
7754463344
3754469433
3354452433
`.trim();

const example1_step7 = `
6707366222
4377366333
4475555827
3496655709
3500625609
3509955566
3486694453
8865585555
4865580644
4465574644
`.trim();

const example1_step8 = `
7818477333
5488477444
5697666949
4608766830
4734946730
4740097688
6900007564
0000009666
8000004755
6800007755
`.trim();

const example1_step9 = `
9060000644
7800000976
6900000080
5840000082
5858000093
6962400000
8021250009
2221130009
9111128097
7911119976
`.trim();

const example1_step10 = `
0481112976
0031112009
0041112504
0081111406
0099111306
0093511233
0442361130
5532252350
0532250600
0032240000
`.trim();

const example1_step20 = `
3936556452
5686556806
4496555690
4448655580
4456865570
5680086577
7000009896
0000000344
6000000364
4600009543
`.trim();

const example1_step30 = `
0643334118
4253334611
3374333458
2225333337
2229333338
2276733333
2754574565
5544458511
9444447111
7944446119
`.trim();


const example1_step40 = `
6211111981
0421111119
0042111115
0003111115
0003111116
0065611111
0532351111
3322234597
2222222976
2222222762
`.trim();

const example1_step50 = `
9655556447
4865556805
4486555690
4458655580
4574865570
5700086566
6000009887
8000000533
6800000633
5680000538
`.trim();

const example1_step60 = `
2533334200
2743334640
2264333458
2225333337
2225333338
2287833333
3854573455
1854458611
1175447111
1115446111
`.trim();

const example1_step70 = `
8211111164
0421111166
0042111114
0004211115
0000211116
0065611111
0532351111
7322235117
5722223475
4572222754
`.trim();

const example1_step80 = `
1755555697
5965555609
4486555680
4458655580
4570865570
5700086566
7000008666
0000000990
0000000800
0000000000
`.trim();

const example1_step90 = `
7433333522
2643333522
2264333458
2226433337
2222433338
2287833333
2854573333
4854458333
3387779333
3333333333
`.trim();

const example1_step100 = `
0397666866
0749766918
0053976933
0004297822
0004229892
0053222877
0532222966
9322228966
7922286866
6789998766
`.trim();

const example1_step193 = `
5877777777
8877777777
7777777777
7777777777
7777777777
7777777777
7777777777
7777777777
7777777777
7777777777
`.trim();

const example1_step194 = `
6988888888
9988888888
8888888888
8888888888
8888888888
8888888888
8888888888
8888888888
8888888888
8888888888
`.trim();

const example1_step195 = `
0000000000
0000000000
0000000000
0000000000
0000000000
0000000000
0000000000
0000000000
0000000000
0000000000
`.trim();

Deno.test("part 1 simulation with simple example", () => {
  const grid = new Grid1(simpleExample1);

  // SIMPLE EXAMPLE

  // will get the same input out without any transformations
  assertEquals(grid.toString(), simpleExample1);
 
  grid.simulate(1);
  assertEquals(grid.toString(), simpleExample1_1);

  grid.simulate(1);
  assertEquals(grid.toString(), simpleExample1_2);
});

Deno.test("part 1 simulation with larger example", () => {
  const grid = new Grid1(example1);

  grid.simulate(1);
  assertEquals(grid.toString(), example1_step1);

  grid.simulate(1);
  assertEquals(grid.toString(), example1_step2);

  grid.simulate(1);
  assertEquals(grid.toString(), example1_step3);
  
  grid.simulate(1);
  assertEquals(grid.toString(), example1_step4);

  grid.simulate(1);
  assertEquals(grid.toString(), example1_step5);

  grid.simulate(1);
  assertEquals(grid.toString(), example1_step6);

  grid.simulate(1);
  assertEquals(grid.toString(), example1_step7);

  grid.simulate(1);
  assertEquals(grid.toString(), example1_step8);

  grid.simulate(1);
  assertEquals(grid.toString(), example1_step9);

  grid.simulate(1);
  assertEquals(grid.toString(), example1_step10);

  grid.simulate(10);
  assertEquals(grid.toString(), example1_step20);

  grid.simulate(10);
  assertEquals(grid.toString(), example1_step30);

  grid.simulate(10);
  assertEquals(grid.toString(), example1_step40);

  grid.simulate(10);
  assertEquals(grid.toString(), example1_step50);

  grid.simulate(10);
  assertEquals(grid.toString(), example1_step60);

  grid.simulate(10);
  assertEquals(grid.toString(), example1_step70);

  grid.simulate(10);
  assertEquals(grid.toString(), example1_step80);

  grid.simulate(10);
  assertEquals(grid.toString(), example1_step90);

  grid.simulate(10);
  assertEquals(grid.toString(), example1_step100);
});

Deno.test("solve1 with larger example", () => {
  assertEquals(solve1(example1), 1656);
});



Deno.test({
  name: 'part 2 simulation',
  fn: () => {
    const grid = new Grid2(example1);

    grid.simulate(193);
    assertEquals(grid.toString(), example1_step193);

    grid.simulate(1);
    assertEquals(grid.toString(), example1_step194);

    grid.simulate(1);
    assertEquals(grid.toString(), example1_step195);
  }
});


Deno.test({
  name: 'solve2',
  fn: () => {
    assertEquals(solve2(example1), 195);
  }
});
