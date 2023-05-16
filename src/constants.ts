export enum CellState {
  EMPTY = "empty",
  A = "a",
  B = "b",
}

export type Player = CellState.A | CellState.B;

export enum Territory {
  A = CellState.A,
  B = CellState.B,
  AB = CellState.A + CellState.B,
  EMPTY = CellState.EMPTY,
}

export type Diff = [-1 | 0 | 1, CellState];
export type DiffMap = Diff[][];

export enum GameState {
  INIT = "init",
  PLAYER_A = CellState.A,
  PLAYER_B = CellState.B,
  GAME_OF_LIFE = "gol",
  END = "end",
}

export type Position = {
  x: number;
  y: number;
};

export type Size = {
  width: number;
  height: number;
};

export type fortressCfg = {
  a: Position & Size;
  b: Position & Size;
};

export const BOARD_SIZE = 20;
export const NB_UPDATE_PER_TURN = 10;
export const NB_MAX_MOVES = 5;
export const FRAME_RATE = 10;
