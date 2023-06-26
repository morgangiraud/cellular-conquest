import { CellState, fortressCfg, Player, Territory } from "./constants";

export class Cell {
  state: CellState;
  territory: Territory;

  constructor(state: CellState, territory: Territory) {
    this.state = state;
    this.territory = territory;
  }

  clone() {
    return new Cell(this.state, this.territory);
  }
}

export class Grid {
  size: number;
  cells: Cell[][];

  constructor(size: number, initStates: CellState[][]) {
    this.size = size;
    const cellStates = new Array(size);
    for (let i = 0; i < size; i++) {
      cellStates[i] = new Array(size);
      for (let j = 0; j < size; j++) {
        cellStates[i][j] = initStates[i][j];
      }
    }

    const cellTerritories = this.computeTerritories(size, cellStates);

    this.cells = new Array(size);
    for (let i = 0; i < size; i++) {
      this.cells[i] = new Array(size);
      for (let j = 0; j < size; j++) {
        this.cells[i][j] = new Cell(initStates[i][j], cellTerritories[i][j]);
      }
    }
  }

  computeTerritories(size: number, cellStates: CellState[][]) {
    const cellTerritories = new Array(size);
    for (let i = 0; i < size; i++) {
      cellTerritories[i] = new Array(size).fill(Territory.EMPTY);

      for (let j = 0; j < size; j++) {
        if (cellStates[i][j] === CellState.A) {
          cellTerritories[i][j] = Territory.A;
          continue;
        }
        if (cellStates[i][j] === CellState.B) {
          cellTerritories[i][j] = Territory.B;
          continue;
        }

        // Check for top and bottom
        if (size % 2 === 0) {
          if (i < size / 2 - 1) {
            cellTerritories[i][j] = Territory.A;
          } else if (i >= size / 2 + 1) {
            cellTerritories[i][j] = Territory.B;
          }
        } else {
          if (i < (size - 1) / 2) {
            cellTerritories[i][j] = Territory.A;
          } else if (i > (size - 1) / 2) {
            cellTerritories[i][j] = Territory.B;
          }
        }

        // Check for neighbors of A and B
        for (let x = Math.max(i - 1, 0); x <= Math.min(i + 1, size - 1); x++) {
          for (
            let y = Math.max(j - 1, 0);
            y <= Math.min(j + 1, size - 1);
            y++
          ) {
            if (x === i && y === j) continue;
            if (cellTerritories[i][j] === Territory.AB) continue;

            if (cellStates[x][y] === CellState.A) {
              if (cellTerritories[i][j] === Territory.B) {
                cellTerritories[i][j] = Territory.AB;
              } else {
                cellTerritories[i][j] = Territory.A;
              }
            }

            if (cellStates[x][y] === CellState.B) {
              if (cellTerritories[i][j] === Territory.A) {
                cellTerritories[i][j] = Territory.AB;
              } else {
                cellTerritories[i][j] = Territory.B;
              }
            }
          }
        }
      }
    }

    return cellTerritories;
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

  computeNextStates() {
    const newStates: CellState[][] = new Array(this.size);
    for (let i = 0; i < this.size; i++) {
      newStates[i] = new Array(this.size);
      for (let j = 0; j < this.size; j++) {
        newStates[i][j] = this.nextState(i, j);
      }
    }

    return newStates;
  }

  update() {
    const newStates = this.computeNextStates();
    const newTerritories = this.computeTerritories(this.size, newStates);

    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        this.cells[i][j].state = newStates[i][j];
        this.cells[i][j].territory = newTerritories[i][j];
      }
    }
  }

  assignCells(states: CellState[][]) {
    const cellStates = new Array(this.size);
    for (let i = 0; i < this.size; i++) {
      cellStates[i] = new Array(this.size);
      for (let j = 0; j < this.size; j++) {
        cellStates[i][j] = states[i][j];
      }
    }
    const cellTerritories = this.computeTerritories(this.size, cellStates);

    this.cells = new Array(this.size);
    for (let i = 0; i < this.size; i++) {
      this.cells[i] = new Array(this.size);
      for (let j = 0; j < this.size; j++) {
        this.cells[i][j] = new Cell(states[i][j], cellTerritories[i][j]);
      }
    }
  }

  clone() {
    const states = this.cells.map((row) => row.map((cell) => cell.state));
    let newGrid = new Grid(this.size, states);
    return newGrid;
  }
}

export class Game {
  size: number;
  fortressCfg: fortressCfg;
  grid: Grid;
  initialPlayer: Player;

  constructor(size: number, fortressCfg: fortressCfg, initialPlayer?: Player) {
    this.size = size;
    this.fortressCfg = fortressCfg;
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

  // What if both fortressCfges are destroyed at the same time?
  checkWin() {
    for (
      let i = this.fortressCfg.a.x;
      i < this.fortressCfg.a.x + this.fortressCfg.a.width;
      i++
    ) {
      for (
        let j = this.fortressCfg.a.y;
        j < this.fortressCfg.a.y + this.fortressCfg.a.height;
        j++
      ) {
        if (this.grid.cells[j][i].state === CellState.B) {
          return CellState.B;
        }
      }
    }

    for (
      let i = this.fortressCfg.b.x;
      i < this.fortressCfg.b.x + this.fortressCfg.b.width;
      i++
    ) {
      for (
        let j = this.fortressCfg.b.y;
        j < this.fortressCfg.b.y + this.fortressCfg.b.height;
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
