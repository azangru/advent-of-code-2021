import { parseInput } from './parseInput.ts';

export const solve2 = (input: string) => {
  const { pointCoortinates, commands } = parseInput(input);
  const paper = new Paper(pointCoortinates);

  for (const command of commands) {
    paper.foldAt(command);
  }

  return paper.toString();
};

export class Paper  {

  private grid: number[][] = []

  constructor(coordinates: Array<{x: number, y: number}>) {
    this.initializeGrid(coordinates);
  }

  private initializeGrid(coordinates: Array<{x: number, y: number}>) {
    const maxX = coordinates.reduce((acc, { x }) => Math.max(acc, x + 1), 0);
    const maxY = coordinates.reduce((acc, { y }) => Math.max(acc, y + 1), 0);

    const grid = [...Array(maxY)].map(() => [...Array(maxX)].fill(0));

    for (const {x, y} of coordinates) {
      grid[y][x] = 1;
    }

    this.grid = grid;
  }

  foldAt(params: { axis: string, value: number }) {
    if (params.axis === 'x') {
      this.foldVertically(params.value);
    } else {
      this.foldHorizontally(params.value);
    }
  }

  foldHorizontally(line: number) {
    const newRowsCount = line;
    const newLastRowIndex = line - 1;

    const newColumnsCount = this.grid[0].length;
    const newGrid = [...Array(newRowsCount)]
      .map(() => [...Array(newColumnsCount)].fill(0));
    
    for (let rowIndex = 0; rowIndex < this.grid.length; rowIndex++) {
      for (let columnIndex = 0; columnIndex < this.grid[0].length; columnIndex++) {
        const cellValue = this.grid[rowIndex][columnIndex];
        if (rowIndex <= newLastRowIndex) {
          newGrid[rowIndex][columnIndex] = cellValue;
        } else if (rowIndex === line) {
          continue;
        } else {
          const mirrorDiff = rowIndex - line - 1;
          const rowIndexAfterFolding = newLastRowIndex - mirrorDiff;
          newGrid[rowIndexAfterFolding][columnIndex] += cellValue;
        }
      }
    }

    this.grid = newGrid;
  }

  foldVertically(line: number) {
    const newColumnsCount = line;
    const newLastColumnIndex = line - 1;

    const newRowsCount = this.grid.length;
    const newGrid = [...Array(newRowsCount)]
      .map(() => [...Array(newColumnsCount)].fill(0));

    
    for (let rowIndex = 0; rowIndex < this.grid.length; rowIndex++) {
      for (let columnIndex = 0; columnIndex < this.grid[0].length; columnIndex++) {
        const cellValue = this.grid[rowIndex][columnIndex];
        if (columnIndex <= newLastColumnIndex) {
          newGrid[rowIndex][columnIndex] = cellValue;
        } else if (columnIndex === line) {
          continue;
        } else {
          const mirrorDiff = columnIndex - line - 1;
          const columnIndexAfterFolding = newLastColumnIndex - mirrorDiff;
          newGrid[rowIndex][columnIndexAfterFolding] += cellValue;
        }
      }
    }

    this.grid = newGrid;
  }
  
  public countVisibleDots() {
    // a visible dot is a cell of a grid with a value above 0
    let result = 0;
    
    for (let rowIndex = 0; rowIndex < this.grid.length; rowIndex++) {
      for (let columnIndex = 0; columnIndex < this.grid[0].length; columnIndex++) {
        if (this.grid[rowIndex][columnIndex]) {
          result++
        }
      }
    }

    return result;
  }

  public toString() {
    return this.grid.map(row => {
      return row.map(cell => cell ? '#' : '.').join('');
    }).join('\n');
  }
}


