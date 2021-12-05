type GameState = {
  calledNumbers: number[];
  boards: Board[];
  lastCalledNumber?: number;
};

type Board = {
  value: number;
  isMarked: boolean;
}[][];


export const solve1 = (input: string) => {
  let gameState: GameState = parseInput(input);
  let continueGame = true;

  while (continueGame) {
    gameState = updateGameState(gameState);
    const { lastCalledNumber = 0 } = gameState;
    const winningBoard = findWinningBoard(gameState.boards);
    if (winningBoard) {
      continueGame = false;
      return countScore(winningBoard, lastCalledNumber);
    }
  }

};

export const solve2 = (input: string) => {
  let gameState: GameState = parseInput(input);
  let continueGame = true;

  while (continueGame) {
    gameState = updateGameState(gameState);
    const { lastCalledNumber = 0 } = gameState;
    const winningBoardIndices = findWinningBoardIndices(gameState.boards);
    if (winningBoardIndices.length) {
      // if it is the last board, stop the game and count the score
      if (gameState.boards.length === 1) {
        continueGame = false;
        const [ lastBoard ] = gameState.boards;
        return countScore(lastBoard, lastCalledNumber);
      }

      // otherwise, exclude the winning boards from the game and continue playing
      for (const index of winningBoardIndices) {
        gameState.boards.splice(index, 1);
      }
    }
  }

};

const parseInput = (input: string) => {
  const inputParts = input.split('\n\n');
  const [calledNumbersLine, ...stringifiedBoards] = inputParts;
  const calledNumbers = calledNumbersLine.split(',').map(number => parseInt(number, 10));
  const boards = stringifiedBoards.map(parseBoard);

  return { calledNumbers, boards };
};

const parseBoard = (input: string): Board => {
  return input.split('\n').map(line => line.trim().split(/\s+/).map(number => ({ value: parseInt(number, 10), isMarked: false })));
};

const updateGameState = (state: GameState): GameState => {
  const { calledNumbers, boards } = state;
  const [nextNumber, ...remainingNumbers] = calledNumbers;
  const updatedBoards = updateBoards(boards, nextNumber);

  return {
    calledNumbers: remainingNumbers,
    boards: updatedBoards,
    lastCalledNumber: nextNumber
  };
};

// will mutate the boards
const updateBoards = (boards: Board[], number: number) => {
  for (const board of boards) {
    for (const row of board) {
      for (const cell of row) {
        if (cell.value === number) {
          cell.isMarked = true;
        }
      }
    }
  }

  return boards;
};

const findWinningBoard = (boards: Board[]) => {
  for (const board of boards) {
    if (doesBoardHaveWinningRow(board) || doesBoardHaveWinningColumn(board)) {
      return board;
    }
  }
  return null;
};

const findWinningBoardIndices = (boards: Board[]) => {
  return boards.reduce((acc, board, index): number[] => {
    if (doesBoardHaveWinningRow(board) || doesBoardHaveWinningColumn(board)) {
      acc.push(index);
    }
    return acc;
  }, [] as number[]);
};

const doesBoardHaveWinningRow = (board: Board) => {
  return board.some(row => row.every(cell => cell.isMarked));
};

const doesBoardHaveWinningColumn = (board: Board) => {
  const columnsCount = board[0].length;

  for (let i = 0; i < columnsCount; i++) {
    if (board.every(row => row[i].isMarked)) {
      return true;
    }
  }

  return false;
};

const countScore = (winningBoard: Board, lastCalledNumber: number) => {
  let sumOfUnmarkedNumbers = 0;

  for (const row of winningBoard) {
    for (const cell of row) {
      if (!cell.isMarked) {
        sumOfUnmarkedNumbers += cell.value;
      }
    }
  }

  return sumOfUnmarkedNumbers * lastCalledNumber;
};
