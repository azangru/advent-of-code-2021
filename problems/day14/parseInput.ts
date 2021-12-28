export const parseInput = (input: string) => {
  input = input.trim();
  const [initialChain, rulesBlock] = input.split('\n\n');

  const insertionMap = new Map<string, string>();

  rulesBlock
    .split('\n')
    .forEach(line => {
      const [key, value] = line.split(' -> ');
      insertionMap.set(key, value);
    });

  return { initialChain, insertionMap };
};
