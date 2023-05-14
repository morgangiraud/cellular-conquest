import { CellState, Fortress, Player } from "./constants";

class Cell {
  state: CellState;
  constructor(state: CellState) {
    this.state = state;
  }
}

export class Grid {
  size: number;
  cells: Cell[][];

  constructor(size: number, initStates: CellState[][]) {
    this.size = size;
    this.cells = new Array(size);
    for (let i = 0; i < size; i++) {
      this.cells[i] = new Array(size);
      for (let j = 0; j < size; j++) {
        this.cells[i][j] = new Cell(initStates[i][j]);
      }
    }
  }

  nextState(i: number, j: number) {
    let countA = 0,
      countB = 0;
    for (let x = Math.max(i - 1, 0); x <= Math.min(i + 1, this.size - 1); x++) {
      for (
        let y = Math.max(j - 1, 0);
        y <= Math.min(j + 1, this.size - 1);
        y++
      ) {
        if (x !== i || y !== j) {
          if (this.cells[x][y].state === CellState.A) {
            countA++;
          } else if (this.cells[x][y].state === CellState.B) {
            countB++;
          }
        }
      }
    }

    if (this.cells[i][j].state === CellState.EMPTY && countA + countB === 3) {
      return countA > countB ? CellState.A : CellState.B;
    } else if (
      this.cells[i][j].state !== CellState.EMPTY &&
      (countA + countB < 2 || countA + countB > 3)
    ) {
      return CellState.EMPTY;
    } else {
      return this.cells[i][j].state;
    }
  }

  update() {
    let newStates: CellState[][] = new Array(this.size);
    for (let i = 0; i < this.size; i++) {
      newStates[i] = new Array(this.size);
      for (let j = 0; j < this.size; j++) {
        newStates[i][j] = this.nextState(i, j);
      }
    }

    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        this.cells[i][j].state = newStates[i][j];
      }
    }
  }

  assignCells(states: CellState[][]) {
    this.cells = new Array(this.size);
    for (let i = 0; i < this.size; i++) {
      this.cells[i] = new Array(this.size);
      for (let j = 0; j < this.size; j++) {
        this.cells[i][j] = new Cell(states[i][j]);
      }
    }
  }
}

export class Game {
  size: number;
  fortress: Fortress;
  grid: Grid;
  initialPlayer: Player;

  constructor(size: number, fortress: Fortress, initialPlayer?: Player) {
    this.size = size;
    this.fortress = fortress;
    this.grid = new Grid(size, this.initialStates());
    this.initialPlayer =
      initialPlayer || Math.random() < 0.5 ? CellState.A : CellState.B;
  }

  initialStates() {
    let states = new Array(this.size);
    for (let i = 0; i < this.size; i++) {
      states[i] = new Array(this.size);
      for (let j = 0; j < this.size; j++) {
        states[i][j] = CellState.EMPTY;
      }
    }
    return states;
  }

  // playTurn(i: number, j: number, newState: CellState) {
  //   if (
  //     this.grid.cells[i][j].state === CellState.EMPTY &&
  //     i < this.size / 2 === (this.turn === CellState.A)
  //   ) {
  //     this.grid.cells[i][j].state = newState;
  //     this.grid.update();
  //     this.turn = this.turn === CellState.A ? CellState.B : CellState.A;
  //     return true;
  //   }
  //   return false;
  // }

  // What if both fortresses are destroyed at the same time?
  checkWin() {
    for (
      let i = this.fortress.a.x;
      i < this.fortress.a.x + this.fortress.a.width;
      i++
    ) {
      for (
        let j = this.fortress.a.y;
        j < this.fortress.a.y + this.fortress.a.height;
        j++
      ) {
        if (this.grid.cells[j][i].state === CellState.B) {
          return CellState.B;
        }
      }
    }

    for (
      let i = this.fortress.b.x;
      i < this.fortress.b.x + this.fortress.b.width;
      i++
    ) {
      for (
        let j = this.fortress.b.y;
        j < this.fortress.b.y + this.fortress.b.height;
        j++
      ) {
        if (this.grid.cells[j][i].state === CellState.A) {
          return CellState.A;
        }
      }
    }

    return false;
  }

  getCellStates() {
    let states = new Array(this.size);
    for (let i = 0; i < this.size; i++) {
      states[i] = new Array(this.size);
      for (let j = 0; j < this.size; j++) {
        states[i][j] = this.grid.cells[i][j].state;
      }
    }
    return states;
  }
}
