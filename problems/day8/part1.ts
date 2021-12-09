const unequivocalSequenceLengths = new Set([
  2, // two segments, corresponds to the digit 1
  3, // three segments, corresponds to the digit 7
  4, // four segments, corresponds to the digit 4
  7 // seven segments, corresponds to the digit 8
]);

export const solve1 = (input: string) => {
  const lines = input.split('\n');

  return lines.reduce((acc, line) => {
    const groups = (parseLine(line));
    let count = 0;
    for (const group of groups) {
      if (unequivocalSequenceLengths.has(group.length)) {
        count++;
      }
    }

    return acc + count;
  }, 0);
};

const parseLine = (line: string) => {
  const output = line.split('|')[1];
  const groups = output.trim().split(' ');
  return groups;
};
