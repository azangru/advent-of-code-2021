type Instruction = {
  direction: string;
  units: number;
};

type State = {
  x: number;
  depth: number;
  aim: number;
};

export const solve2 = (instructions: string[]) => {
  const parsedInstructions = instructions.map(parseInstruction);
  const finalState = move(parsedInstructions);
  return finalState.x * finalState.depth;
};

const move = (instructions: Instruction[]) => {
  const initialState: State = { x: 0, depth: 0, aim: 0 };

  return instructions.reduce((position, instruction) => {
    return updatePosition(instruction, position);
  }, initialState);
};

const updatePosition = (instruction: Instruction, state: State): State => {
  const { direction, units } = instruction;
  let deltaX = 0;
  let deltaDepth = 0;
  let deltaAim = 0;
  if (direction === 'forward') {
    deltaX = units;
    deltaDepth = units * state.aim;
  } else if (direction === 'down') {
    deltaAim = units;
  } else if (direction === 'up') {
    deltaAim = -units;
  }

  return {
    x: state.x + deltaX,
    depth: state.depth + deltaDepth,
    aim: state.aim + deltaAim
  };
};

const parseInstruction = (instruction: string) => {
  const [direction, distanceAsString] = instruction.split(' ');
  const units = parseInt(distanceAsString);
  return { direction, units };
};
