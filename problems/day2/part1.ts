type Instruction = {
  direction: string;
  distance: number;
};

type Position = {
  x: number;
  depth: number;
};

export const solve1 = (instructions: string[]) => {
  const parsedInstructions = instructions.map(parseInstruction);
  const finalPosition = move(parsedInstructions);
  return finalPosition.x * finalPosition.depth;
};

const move = (instructions: Instruction[]) => {
  const initialPosition: Position = { x: 0, depth: 0 };

  return instructions.reduce((position, instruction) => {
    return updatePosition(instruction, position);
  }, initialPosition);
};

const updatePosition = (instruction: Instruction, position: Position): Position => {
  const { direction, distance } = instruction;
  let deltaX = 0;
  let deltaDepth = 0;
  if (direction === 'forward') {
    deltaX = distance;
  } else if (direction === 'down') {
    deltaDepth = distance;
  } else if (direction === 'up') {
    deltaDepth = -distance;
  }

  return {
    x: position.x + deltaX,
    depth: position.depth + deltaDepth
  };
};

const parseInstruction = (instruction: string) => {
  const [direction, distanceAsString] = instruction.split(' ');
  const distance = parseInt(distanceAsString);
  return { direction, distance };
};
