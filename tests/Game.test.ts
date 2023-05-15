import { Grid } from "@/Game";
import { CellState, Territory } from "@/constants";

describe("Grid", () => {
  describe("computeTerritories", () => {
    it("should correctly assign territories based on cell states", () => {
      const size = 6; // Make sure this is a multiple of 3 for easy testing
      const initStates: CellState[][] = Array(size).fill(
        Array(size).fill(CellState.EMPTY)
      );
      const grid = new Grid(size, initStates);

      const territories = grid.computeTerritories(size, initStates);
      //   console.log(initStates);
      //   console.log(territories);

      // Check that the top third is Territory.A
      for (let i = 0; i < size / 3; i++) {
        for (let j = 0; j < size; j++) {
          expect(territories[i][j]).toEqual(Territory.A);
        }
      }

      // Check that the bottom third is Territory.B
      for (let i = (size / 3) * 2; i < size; i++) {
        for (let j = 0; j < size; j++) {
          expect(territories[i][j]).toEqual(Territory.B);
        }
      }

      // Check that the middle third is Territory.EMPTY
      for (let i = size / 3; i < (size / 3) * 2; i++) {
        for (let j = 0; j < size; j++) {
          expect(territories[i][j]).toEqual(Territory.EMPTY);
        }
      }
    });

    it("should correctly assign territories based on neighboring cell states", () => {
      const size = 4; // Make sure this is a multiple of 3 for easy testing
      const initStates = [
        [CellState.A, CellState.A, CellState.A, CellState.A],
        [CellState.EMPTY, CellState.EMPTY, CellState.EMPTY, CellState.EMPTY],
        [CellState.EMPTY, CellState.B, CellState.EMPTY, CellState.EMPTY],
        [CellState.B, CellState.B, CellState.B, CellState.B],
      ];
      const expectedTerritories = [
        [Territory.A, Territory.A, Territory.A, Territory.A],
        [Territory.AB, Territory.AB, Territory.AB, Territory.A],
        [Territory.B, Territory.B, Territory.B, Territory.B],
        [Territory.B, Territory.B, Territory.B, Territory.B],
      ];
      const grid = new Grid(size, initStates);
      const territories = grid.computeTerritories(size, initStates);
      //   console.log(initStates);
      //   console.log(territories);

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
        [CellState.EMPTY, CellState.A, CellState.EMPTY],
        [CellState.A, CellState.EMPTY, CellState.B],
        [CellState.EMPTY, CellState.B, CellState.EMPTY],
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
      grid.cells[0][0].state = CellState.A;
      expect(grid.cells[0][0].state).toEqual(CellState.A);
      expect(clonedGrid.cells[0][0].state).toEqual(CellState.EMPTY);
    });
  });
});
