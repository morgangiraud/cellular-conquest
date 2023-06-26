import { Grid } from "@/Game";
import { CellState, Territory } from "@/constants";

const CA = CellState.A;
const CB = CellState.B;
const CE = CellState.EMPTY;

const TA = Territory.A;
const TB = Territory.B;
const TAB = Territory.AB;
const TE = Territory.EMPTY;

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
});
