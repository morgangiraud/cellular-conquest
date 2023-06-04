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
  PLAYER_A_WAITING = "a_waiting",
  PLAYER_B = CellState.B,
  PLAYER_B_WAITING = "b_waiting",
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

export const BOARD_SIZE = 13;
export const NB_UPDATE_PER_TURN = 7;
export const NB_MAX_MOVES = 5;
export const FRAME_RATE = 8;
