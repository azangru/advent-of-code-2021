const PARENTHESES = [
  ['(', ')'],
  ['[', ']'],
  ['{', '}'],
  ['<', '>']
] as const;

const parenthesesMap = new Map<string, string>(PARENTHESES);
const openingParentheses = new Set([...parenthesesMap.keys()]);

const points = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137
};

export const solve1 = (input: string) => {
  const lines = input.split('\n');

  return lines
    .map(findFirstIllegalCharacter).filter(x => Boolean(x))
    .reduce((acc, character) => acc + points[character as keyof typeof points], 0);
};

const findFirstIllegalCharacter = (line: string) => {
  const stack = [];

  const characters = line.split('');

  for (const character of characters) {
    if (openingParentheses.has(character)) {
      stack.push(character)
    } else {
      const lastOpeningCharacter = stack.pop() as string;
      if (character !== parenthesesMap.get(lastOpeningCharacter)) {
        return character;
      }
    }
  }

  return null;
};
