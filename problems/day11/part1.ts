type Cell = {
  value: number;
  flashed: boolean;
};

export const solve1 = (input: string) => {
  const grid = new Grid(input);
  grid.simulate(100);

  return grid.flashCount;
};

export class Grid {
  grid: Cell[][];
  flashCount = 0;

  constructor(input: string) {
    this.grid = this.createGrid(input)
  }

  simulate(cycles: number) {
    for (let i = 0; i < cycles; i++) {
      this.updateGrid();
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
    this.flashCount = this.flashCount + this.countFlashed();
    this.resetFlashed();
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

  countFlashed() {
    let result = 0;
    for (const row of this.grid) {
      for (const cell of row) {
        if (cell.flashed) {
          result += 1;
        }
      }
    }

    return result;
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

  toString() {
    return this.grid.map(line => line.map(cell => cell.value).join('')).join('\n');
  }
}
