const PARENTHESES = [
  ['(', ')'],
  ['[', ']'],
  ['{', '}'],
  ['<', '>']
] as const;

const parenthesesMap = new Map<string, string>(PARENTHESES);
const openingParentheses = new Set([...parenthesesMap.keys()]);

const points = {
  ')': 1,
  ']': 2,
  '}': 3,
  '>': 4
};

export const solve2 = (input: string) => {
  const lines = input.split('\n');

  const scores = lines
    .filter(isValidLine)
    .map(completeLine)
    .map(scoreLine);

  scores.sort((a, b) => a - b);

  return scores[Math.floor(scores.length / 2)];
};

const isValidLine = (line: string) => findFirstIllegalCharacter(line) === null;

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

const completeLine = (line: string) => {
  const stack = [];

  const characters = line.split('');

  for (const character of characters) {
    if (openingParentheses.has(character)) {
      stack.push(character)
    } else {
      stack.pop();
    }
  }

  return stack.reverse().map(char => parenthesesMap.get(char)) as string[];
};

const scoreLine = (characters: string[]) => {
  return characters.reduce((acc, character) => {
    return acc * 5 + points[character as keyof typeof points];
  }, 0);
};
