/**  

  0:      1:      2:      3:      4:
 aaaa    ....    aaaa    aaaa    ....
b    c  .    c  .    c  .    c  b    c
b    c  .    c  .    c  .    c  b    c
 ....    ....    dddd    dddd    dddd
e    f  .    f  e    .  .    f  .    f
e    f  .    f  e    .  .    f  .    f
 gggg    ....    gggg    gggg    ....

  5:      6:      7:      8:      9:
 aaaa    aaaa    aaaa    aaaa    aaaa
b    .  b    .  .    c  b    c  b    c
b    .  b    .  .    c  b    c  b    c
 dddd    dddd    ....    dddd    dddd
.    f  e    f  .    f  e    f  .    f
.    f  e    f  .    f  e    f  .    f
 gggg    gggg    ....    gggg    gggg

*/


/**
 * 2 letters -> 1
 * 3 letters -> 7
 * 4 letters -> 4
 * 5 letters -> 2, 3, 5
 * 6 letters -> 0, 6, 9
 * 7 letters -> 8
 * 
 * 
 * 
 * Start with: [a, b, c, d, e, f, g]
 * 
 * Find 1 (2 letters)
 * Find 7 (3 letters)
 * -> the letter in 7 that's missing in 1 is "a" (remain:  [b, c, d, e, f, g])
 * Find 4 (4 letters)
 * Find 3 (5 letters, 3 same with 7)
 * Compare 3 with 4:
 * - the letter that 4 has but 3 doesn't is "b" (remain:  [c, d, e, f, g])
 * - the letter that 3 has, and is not "a", and 4 doesn't is "g" (remain:  [c, d, e, f])
 * Find 5 (5 letters, has "b")
 * 
 * Compare 3 and 2:
 * - the letter that 2 has but 3 doesn't is "e" (remain:  [c, d, f])
 * - the letter that 3 has but 2 doesn't is "f" (remain:  [c, d])
 * Knowing what is "f", we can now say what is "c" (by looking at 1) ((remain:  [d])
 */


export const solve2 = (input: string) => {
  const lines = input.split('\n');
  const parsedLines = lines.map(parseLine).map(deduceSignals);

  return parsedLines.reduce((acc, line) => {
    const { signalMap, puzzleInput } = line;
    const number = puzzleInput.map(puzzle => toNumber(puzzle, signalMap)).join('');

    return acc + parseInt(number);
  }, 0);
};

const parseLine = (line: string) => {
  const [allSignalsString, puzzleInputString] = line.split('|');
  const allSignals = allSignalsString.trim().split(' ');
  const puzzleInput = puzzleInputString.trim().split(' ');

  return { allSignals, puzzleInput };
};

const deduceSignals = (params: ReturnType<typeof parseLine>) => {
  const { allSignals } = params;
  const signalMap = new Map<string, string>();

  // find unique signals
  const one = allSignals.find(signal => signal.length === 2) as string;
  const four = allSignals.find(signal => signal.length === 4) as string;
  const seven = allSignals.find(signal => signal.length === 3) as string;

  const three = allSignals.find(signal => {
    return signal.length === 5 && countCommonLetters(signal, seven) === 3;
  }) as string;

  signalMap.set('a', findMissingLetter(one, seven));
  signalMap.set('b', findMissingLetter(three, four));
  signalMap.set('g', findMissingLetter(four, subtractLetter(three, signalMap.get('a') as string)));
  signalMap.set('d', findMissingLetter(`${seven}${signalMap.get('b')}`, four ));

  const five = allSignals.find(signal => {
    return signal.length === 5 && signal.includes(signalMap.get('b') as string);
  }) as string;
  const segmentF = five.split('').find(letter => {
    return ![
      signalMap.get('a'),
      signalMap.get('b'),
      signalMap.get('d'),
      signalMap.get('g')
    ].includes(letter);
  }) as string;

  signalMap.set('f', segmentF);

  const segmentC = one.split('').find(letter => {
    return letter !== signalMap.get('f');
  }) as string;

  signalMap.set('c', segmentC);

  const segmentE = 'abcdefg'.split('').find(letter => {
    return !(new Set([...signalMap.values()])).has(letter);
  }) as string;

  signalMap.set('e', segmentE);

  return {
    ...params,
    signalMap
  };
};

const findMissingLetter = (missingIn: string, presentIn: string) => {
  const letters = new Set(Array.from(missingIn));

  return Array.from(presentIn).find(letter => !letters.has(letter)) as string;
};

const countCommonLetters = (string1: string, string2: string) => {
  const letters = new Set(Array.from(string1));

  return Array.from(string2).reduce((acc, letter) => {
    return letters.has(letter) ? acc + 1 : acc;
  }, 0);
};

const subtractLetter = (string: string, letter: string) =>
  Array.from(string).filter(ch => ch !== letter).join('');



const toNumber = (puzzle: string, signalMap: Map<string, string>) => {
  const normalMap: [number, string][] = [
    [0, 'abcefg'],
    [1, 'cf'],
    [2, 'acdeg'],
    [3, 'acdfg'],
    [4, 'bcdf'],
    [5, 'abdfg'],
    [6, 'abdefg'],
    [7, 'acf'],
    [8, 'abcdefg'],
    [9, 'abcdfg']
  ];
  
  return normalMap
    .map(([number, string]) => [number, convert(string, signalMap)] as const)
    .find(([, string]) => haveSameLetters(string, puzzle))?.[0] as number;
};

const convert = (string: string, signalMap: Map<string, string>) => {
  return Array.from(string)
    .map(letter => signalMap.get(letter))
    .join('');
}

const haveSameLetters = (string1: string, string2: string) => {
  const letters = new Set(Array.from(string1));

  return string1.length === string2.length && Array.from(string2).every(letter => letters.has(letter));
};
