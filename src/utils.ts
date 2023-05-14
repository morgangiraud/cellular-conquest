import { CellState } from "./constants";

export function initBoardState(size: number): CellState[][] {
  const boardState = Array(size)
    .fill(undefined)
    .map((_, i) => {
      const row = Array(size)
        .fill(undefined)
        .map((_, j) => {
          //   if (i >= 2 && i <= 2 && j >= size / 2 && j < (size + 1) / 2) {
          //     return CellState.FORTRESS;
          //   }

          //   if (
          //     i >= size - 2 &&
          //     i <= size - 2 &&
          //     j >= size / 2 &&
          //     j < (size + 1) / 2
          //   ) {
          //     return CellState.FORTRESS;
          //   }
          return CellState.EMPTY;
        });

      return row;
    });

  return boardState;
}
