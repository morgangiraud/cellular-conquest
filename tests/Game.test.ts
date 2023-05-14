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
});
