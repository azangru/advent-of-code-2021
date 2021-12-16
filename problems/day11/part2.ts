type Cell = {
  value: number;
  flashed: boolean;
};

export const solve2 = (input: string) => {
  const grid = new Grid(input);
  grid.simulateUntilAllFlashed();

  return grid.stepCount;
};

export class Grid {
  grid: Cell[][];
  stepCount = 0;

  constructor(input: string) {
    this.grid = this.createGrid(input)
  }

  simulate(cycles: number) {
    for (let i = 0; i < cycles; i++) {
      this.updateGrid();
    }
  }

  simulateUntilAllFlashed() {
    let areAllFlashing = false;

    while(!areAllFlashing) {
      areAllFlashing = this.updateGrid();
      this.stepCount += 1;
    }
  }

  private createGrid(input: string): Cell[][] {
    return input
      .split('\n')
      .map(line => line.split('').map((digit => parseInt(digit))))
      .map(line => line.map(number => ({ value: number, flashed: false })));
  }

  updateGrid() {
    this.addOne();
    this.checkGrid();

    const areAllFlashing = this.areAllFlashing();
    this.resetFlashed();

    return areAllFlashing;
  }

  addOne() {
    for (let rowIndex = 0; rowIndex < this.grid.length; rowIndex++) {
      for (let columnIndex = 0; columnIndex < this.grid.length; columnIndex++) {
        this.grid[rowIndex][columnIndex].value += 1;
      }
    }
  }

  checkGrid() {
    for (let rowIndex = 0; rowIndex < this.grid.length; rowIndex++) {
      for (let columnIndex = 0; columnIndex < this.grid.length; columnIndex++) {
        const cell = this.grid[rowIndex][columnIndex];
        if (!cell.flashed && cell.value > 9) {
          cell.flashed = true;
          this.updateAroundFlashed({rowIndex, columnIndex}); // <--- HERE!!!
        }
      }
    }
  }

  updateAroundFlashed(position: {rowIndex: number, columnIndex: number}) {
    const { rowIndex, columnIndex } = position;

    for (let i = Math.max(rowIndex - 1, 0); i <= rowIndex + 1; i++) {
      for (let j = Math.max(columnIndex - 1, 0); j <= columnIndex + 1; j++) {
        if (!(i === rowIndex && j === columnIndex)) {
          const cell = this.grid[i]?.[j];
          if (typeof cell === 'undefined') {
            continue;
          }

          cell.value += 1;

          if (cell.value === 10) {
            cell.flashed = true;
            this.updateAroundFlashed({ rowIndex: i, columnIndex: j });
          }
        }
      }
    }
  }

  resetFlashed() {
    for (const row of this.grid) {
      for (const cell of row) {
        if (cell.value > 9) {
          cell.value = 0;
          cell.flashed = false;
        }
      }
    }
  }

  areAllFlashing() {
    for (const row of this.grid) {
      for (const cell of row) {
        if (!cell.flashed) {
          return false;
        }
      }
    }

    return true;
  }

  toString() {
    return this.grid.map(line => line.map(cell => cell.value).join('')).join('\n');
  }
}
