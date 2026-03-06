import { Game, Grid } from "@/Game";
import { CellState, Territory } from "@/constants";

const CA = CellState.A;
const CB = CellState.B;
const CE = CellState.EMPTY;

const TA = Territory.A;
const TB = Territory.B;
const TAB = Territory.AB;
const TE = Territory.EMPTY;

const createEmptyStates = (size: number): CellState[][] =>
  Array.from({ length: size }, () => Array(size).fill(CE));

const expectGridStates = (grid: Grid, expectedStates: CellState[][]) => {
  for (let i = 0; i < grid.size; i++) {
    for (let j = 0; j < grid.size; j++) {
      expect(grid.cells[i][j].state).toEqual(expectedStates[i][j]);
    }
  }
};

const expectGridTerritories = (
  grid: Grid,
  expectedTerritories: Territory[][]
) => {
  for (let i = 0; i < grid.size; i++) {
    for (let j = 0; j < grid.size; j++) {
      expect(grid.cells[i][j].territory).toEqual(expectedTerritories[i][j]);
    }
  }
};

describe("Grid", () => {
  describe("computeTerritories", () => {
    it("should correctly assign territories based on cell states", () => {
      const size = 5;
      const initStates: CellState[][] = Array(size).fill(Array(size).fill(CE));
      const grid = new Grid(size, initStates);

      const territories = grid.computeTerritories(size, initStates);

      const expectedTerritories = [
        [TA, TA, TA, TA, TA],
        [TA, TA, CA, TA, TA],
        [TE, TE, TE, TE, TE],
        [TB, TB, TB, TB, TB],
        [TB, TB, TB, TB, TB],
      ];

      for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
          expect(territories[i][j]).toEqual(expectedTerritories[i][j]);
        }
      }
    });

    it("should correctly assign territories based on cell states", () => {
      const size = 6;
      const initStates: CellState[][] = Array(size).fill(Array(size).fill(CE));
      const grid = new Grid(size, initStates);

      const territories = grid.computeTerritories(size, initStates);

      const expectedTerritories = [
        [TA, TA, TA, TA, TA, TA],
        [TA, TA, CA, TA, TA, TA],
        [TE, TE, TE, TE, TE, TE],
        [TE, TE, TE, TE, TE, TE],
        [TB, TB, TB, TB, TB, TB],
        [TB, TB, TB, TB, TB, TB],
      ];

      for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
          expect(territories[i][j]).toEqual(expectedTerritories[i][j]);
        }
      }
    });

    it("distant case", () => {
      const size = 4;
      const initStates = [
        [CA, CA, CA, CA],
        [CE, CE, CE, CE],
        [CE, CB, CE, CE],
        [CB, CB, CB, CB],
      ];
      const expectedTerritories = [
        [TA, TA, TA, TA],
        [TAB, TAB, TAB, TA],
        [TB, TB, TB, TB],
        [TB, TB, TB, TB],
      ];
      const grid = new Grid(size, initStates);
      const territories = grid.computeTerritories(size, initStates);

      // Check that the middle third is Territory.EMPTY
      for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
          expect(territories[i][j]).toEqual(expectedTerritories[i][j]);
        }
      }
    });

    it("touching case", () => {
      const size = 4;
      const initStates = [
        [CA, CA, CA, CA],
        [CE, CA, CA, CE],
        [CE, CB, CB, CE],
        [CB, CB, CB, CB],
      ];
      const expectedTerritories = [
        [TA, TA, TA, TA],
        [TAB, TA, TA, TAB],
        [TAB, TB, TB, TAB],
        [TB, TB, TB, TB],
      ];
      const grid = new Grid(size, initStates);
      const territories = grid.computeTerritories(size, initStates);

      // Check that the middle third is Territory.EMPTY
      for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
          expect(territories[i][j]).toEqual(expectedTerritories[i][j]);
        }
      }
    });

    it("limit case", () => {
      const size = 5;
      const initStates = [
        [CE, CE, CE, CE, CE],
        [CE, CE, CA, CE, CE],
        [CE, CE, CE, CE, CE],
        [CE, CE, CB, CE, CE],
        [CE, CE, CE, CE, CE],
      ];
      const expectedTerritories = [
        [TA, TA, TA, TA, TA],
        [TA, TA, CA, TA, TA],
        [TE, TAB, TAB, TAB, TE],
        [TB, TB, TB, TB, TB],
        [TB, TB, TB, TB, TB],
      ];
      const grid = new Grid(size, initStates);
      const territories = grid.computeTerritories(size, initStates);

      // Check that the middle third is Territory.EMPTY
      for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
          expect(territories[i][j]).toEqual(expectedTerritories[i][j]);
        }
      }
    });
  });

  describe("clone", () => {
    it("should return a new grid with the same state as the original grid", () => {
      const size = 3;
      const initStates = [
        [CE, CA, CE],
        [CA, CE, CB],
        [CE, CB, CE],
      ];
      const grid = new Grid(size, initStates);
      const clonedGrid = grid.clone();

      // Ensure that the cloned grid has the same size as the original grid
      expect(clonedGrid.size).toEqual(grid.size);

      // Ensure that the cloned grid has the same state as the original grid
      for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
          expect(clonedGrid.cells[i][j].state).toEqual(grid.cells[i][j].state);
        }
      }

      // Ensure that the cloned grid is a new object
      expect(clonedGrid).not.toBe(grid);

      // Ensure we deep cloned the grid
      grid.cells[0][0].state = CA;
      expect(grid.cells[0][0].state).toEqual(CA);
      expect(clonedGrid.cells[0][0].state).toEqual(CE);
    });
  });

  describe("nextState", () => {
    it("should spawn player A when there are exactly three neighbors and A is in majority", () => {
      const initStates = [
        [CA, CE, CE],
        [CB, CE, CA],
        [CE, CE, CE],
      ];
      const grid = new Grid(3, initStates);

      expect(grid.nextState(1, 1)).toEqual(CA);
    });

    it("should spawn player B when there are exactly three neighbors and B is in majority", () => {
      const initStates = [
        [CB, CE, CE],
        [CA, CE, CB],
        [CE, CE, CE],
      ];
      const grid = new Grid(3, initStates);

      expect(grid.nextState(1, 1)).toEqual(CB);
    });

    it("should remove a living cell by underpopulation when it has fewer than two neighbors", () => {
      const initStates = [
        [CE, CE, CE],
        [CE, CA, CA],
        [CE, CE, CE],
      ];
      const grid = new Grid(3, initStates);

      expect(grid.nextState(1, 1)).toEqual(CE);
    });

    it("should remove a living cell by overpopulation when it has more than three neighbors", () => {
      const initStates = [
        [CA, CA, CA],
        [CA, CA, CE],
        [CE, CE, CE],
      ];
      const grid = new Grid(3, initStates);

      expect(grid.nextState(1, 1)).toEqual(CE);
    });

    it("should keep a living cell alive when it has two neighbors", () => {
      const initStates = [
        [CA, CE, CE],
        [CE, CA, CA],
        [CE, CE, CE],
      ];
      const grid = new Grid(3, initStates);

      expect(grid.nextState(1, 1)).toEqual(CA);
    });
  });

  describe("computeNextStates", () => {
    it("should compute next states from a snapshot without mutating current grid state", () => {
      const initStates = [
        [CE, CE, CE, CE, CE],
        [CE, CE, CA, CE, CE],
        [CE, CE, CA, CE, CE],
        [CE, CE, CA, CE, CE],
        [CE, CE, CE, CE, CE],
      ];
      const grid = new Grid(5, initStates);

      const nextStates = grid.computeNextStates();
      const expectedStates = [
        [CE, CE, CE, CE, CE],
        [CE, CE, CE, CE, CE],
        [CE, CA, CA, CA, CE],
        [CE, CE, CE, CE, CE],
        [CE, CE, CE, CE, CE],
      ];

      expect(nextStates).toEqual(expectedStates);
      expect(grid.cells[1][2].state).toEqual(CA);
      expect(grid.cells[2][1].state).toEqual(CE);
    });
  });

  describe("update", () => {
    it("should apply precomputed next states and recompute territories consistently", () => {
      const initStates = [
        [CE, CE, CE, CE, CE],
        [CE, CE, CA, CE, CE],
        [CE, CE, CA, CE, CE],
        [CE, CE, CA, CE, CE],
        [CE, CE, CE, CE, CE],
      ];
      const grid = new Grid(5, initStates);

      const expectedStates = grid.computeNextStates();
      const expectedTerritories = grid.computeTerritories(5, expectedStates);

      grid.update();

      expectGridStates(grid, expectedStates);
      expectGridTerritories(grid, expectedTerritories);
    });
  });

  describe("assignCells", () => {
    it("should replace states and territories without sharing references to the input matrix", () => {
      const grid = new Grid(3, createEmptyStates(3));
      const assignedStates = [
        [CE, CA, CE],
        [CB, CE, CE],
        [CE, CE, CE],
      ];
      const expectedTerritories = grid.computeTerritories(3, assignedStates);

      grid.assignCells(assignedStates);
      expectGridStates(grid, assignedStates);
      expectGridTerritories(grid, expectedTerritories);

      assignedStates[0][1] = CE;
      assignedStates[2][2] = CA;
      expect(grid.cells[0][1].state).toEqual(CA);
      expect(grid.cells[2][2].state).toEqual(CE);

      grid.cells[1][0].state = CE;
      expect(assignedStates[1][0]).toEqual(CB);
    });
  });
});

describe("Game", () => {
  const fortressCfg = {
    a: { x: 0, y: 0, width: 2, height: 2 },
    b: { x: 2, y: 2, width: 2, height: 2 },
  };

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("constructor", () => {
    it("should keep the provided initial player", () => {
      const gameA = new Game(4, fortressCfg, CA);
      const gameB = new Game(4, fortressCfg, CB);

      expect(gameA.initialPlayer).toBe(CA);
      expect(gameB.initialPlayer).toBe(CB);
    });

    it("should choose player A when random is below 0.5 and no player is provided", () => {
      jest.spyOn(Math, "random").mockReturnValue(0.49);

      const game = new Game(4, fortressCfg);

      expect(game.initialPlayer).toBe(CA);
    });

    it("should choose player B when random is at or above 0.5 and no player is provided", () => {
      jest.spyOn(Math, "random").mockReturnValue(0.5);

      const game = new Game(4, fortressCfg);

      expect(game.initialPlayer).toBe(CB);
    });
  });

  describe("checkWin", () => {
    it("should return false when no fortress is occupied by the opponent", () => {
      const game = new Game(4, fortressCfg, CA);

      game.grid.assignCells(createEmptyStates(4));

      expect(game.checkWin()).toBe(false);
    });

    it("should declare player B winner when B occupies a boundary cell in fortress A", () => {
      const game = new Game(4, fortressCfg, CA);
      const states = createEmptyStates(4);
      states[1][1] = CB;

      game.grid.assignCells(states);

      expect(game.checkWin()).toBe(CB);
    });

    it("should declare player A winner when A occupies a boundary cell in fortress B", () => {
      const game = new Game(4, fortressCfg, CA);
      const states = createEmptyStates(4);
      states[3][3] = CA;

      game.grid.assignCells(states);

      expect(game.checkWin()).toBe(CA);
    });

    it("should prioritize fortress A breach when both fortresses are breached in the same state", () => {
      const game = new Game(4, fortressCfg, CA);
      const states = createEmptyStates(4);
      states[0][0] = CB;
      states[3][3] = CA;

      game.grid.assignCells(states);

      expect(game.checkWin()).toBe(CB);
    });
  });

  describe("getCellStates", () => {
    it("should return a deep copy of the current grid states", () => {
      const game = new Game(4, fortressCfg, CA);
      const states = createEmptyStates(4);
      states[0][1] = CA;
      states[2][2] = CB;
      game.grid.assignCells(states);

      const snapshot = game.getCellStates();
      expect(snapshot).toEqual(states);

      snapshot[0][1] = CE;
      expect(game.grid.cells[0][1].state).toBe(CA);

      game.grid.cells[2][2].state = CE;
      expect(snapshot[2][2]).toBe(CB);
    });
  });
});
