import { CellState, DiffMap } from "./constants";

export function initBoardState(size: number): CellState[][] {
  const boardState = Array(size)
    .fill(undefined)
    .map((_, i) => {
      const row = Array(size)
        .fill(undefined)
        .map((_, j) => {
          return CellState.EMPTY;
        });

      return row;
    });

  return boardState;
}

export function computeDiffMap(
  states: CellState[][],
  nextStates: CellState[][]
): DiffMap {
  return states.map((stateRow, i) =>
    stateRow.map((state, j) => {
      if (state === CellState.EMPTY) {
        return [nextStates[i][j] === CellState.EMPTY ? 0 : 1, nextStates[i][j]];
      } else {
        return [
          nextStates[i][j] === CellState.EMPTY ? -1 : 0,
          nextStates[i][j],
        ];
      }
    })
  );
}

export const classNames = (...classes: string[]) =>
  classes.filter(Boolean).join(" ");
