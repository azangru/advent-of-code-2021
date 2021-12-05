type Coordinates = {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
};

export const solve1 = (input: string) => {
  const { coordinates, maxX, maxY } = parseInput(input);
  const board = createBoard(maxX, maxY);
  fillBoardWithVerticalAndHorizontalLines(board, coordinates);
  return countIntersectionPoints(board);
};

export const solve2 = (input: string) => {
  const { coordinates, maxX, maxY } = parseInput(input);
  const board = createBoard(maxX, maxY);
  fillBoardWithAllLines(board, coordinates);
  return countIntersectionPoints(board);
};

const parseInput = (input: string) => {
  const lines = input.split('\n');
  let maxX = 0;
  let maxY = 0;

  const coordinates = lines.map(line => {
    const [start, end] = line.split(' -> ');
    const [startX, startY] = start.split(',').map(number => parseInt(number));
    const [endX, endY] = end.split(',').map(number => parseInt(number));

    // side effect
    maxX = Math.max(maxX, startX, endX);
    maxY = Math.max(maxY, startY, endY);

    return { startX, startY, endX, endY };
  });

  return {
    coordinates,
    maxX,
    maxY
  }
};

const createBoard = (maxX: number, maxY: number) => {
  const sideSize = Math.max(maxX, maxY) + 1; // it's going to be a square board

  return [...Array(sideSize)]
    .map(() => [...Array(sideSize)].map(() => 0));
};

const fillBoardWithVerticalAndHorizontalLines = (board: number[][], coordinatesList: Coordinates[]) => {
  // only keep coordinates where startX === endX or startY === endY
  const filteredCoordinatesList = coordinatesList.filter((coordinates) => {
    return coordinates.startX === coordinates.endX ||
      coordinates.startY === coordinates.endY;
  });

  for (const coordinates of filteredCoordinatesList) {
    if (coordinates.startY === coordinates.endY) {
      fillHorizontalLine(board, coordinates);
    } else if (coordinates.startX === coordinates.endX) {
      fillVerticalLine(board, coordinates);
    }
  }
};

const fillBoardWithAllLines = (board: number[][], coordinatesList: Coordinates[]) => {
  for (const coordinates of coordinatesList) {
    if (coordinates.startY === coordinates.endY) {
      fillHorizontalLine(board, coordinates);
    } else if (coordinates.startX === coordinates.endX) {
      fillVerticalLine(board, coordinates);
    } else {
      fillDiagonalLine(board, coordinates);
    }
  }
};

const fillHorizontalLine = (board: number[][], coordinates: Coordinates) => {
  const { startX, startY, endX } = coordinates;
  // the line can go either left to right or right to left
  const start = Math.min(startX, endX);
  const end = start === startX ? endX : startX;

  for (let i = start; i <= end; i++) {
    board[startY][i] += 1;
  }
};

const fillVerticalLine = (board: number[][], coordinates: Coordinates) => {
  const { startX, startY, endY } = coordinates;
  // the line can go either top to bottom or bottom to top
  const start = Math.min(startY, endY);
  const end = start === startY ? endY : startY;

  for (let i = start; i <= end; i++) {
    board[i][startX] += 1;
  }
};

const fillDiagonalLine = (board: number[][], coordinates: Coordinates) => {
  const { startX, startY, endX, endY } = coordinates;
  // the line can go either left to right or right to left
  const start = Math.min(startX, endX);
  const end = start === startX ? endX : startX;

  // the horizontal line only ever goes at 45 degrees
  const direction = startX < endX ? 1 : - 1;
  // const slope = startY < endY ? 1 : -1;

  const slope = startY < endY
    ? direction > 0
      ? 1
      : -1
    : direction > 0
      ? - 1
      : 1;

  for (let i = start; i <= end; i++) {
    // const deltaY = i - start;
    const x = i;
    const y = direction > 0 ? startY + (i - start) * slope : endY + (i - start) * slope;
    board[y][x] += 1;
  }
};


const countIntersectionPoints = (board: number[][]) => {
  let result = 0;

  for (const row of board) {
    for (const cell of row) {
      if (cell > 1) {
        result++;
      }
    }
  }

  return result;
};
