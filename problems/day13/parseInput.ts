export const parseInput = (input: string) => {
  input = input.trim();
  const [pointsString, commandsString] = input.split('\n\n');
  const pointCoortinates = pointsString
    .split('\n')
    .map(line => {
      const [x, y] = line.split(',').map(number => parseInt(number));
      return { x, y };
    });
  const commands = commandsString
    .split('\n')
    .map(line => {
      const [axis, value] = line
        .replace('fold along ', '')
        .split('=')
        .map((item, index) => index === 1 ? parseInt(item) : item)
      return { axis, value };
    }) as Array<{axis: string, value: number}>;
  
  return { pointCoortinates, commands };
};
