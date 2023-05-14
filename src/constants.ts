export enum CellState {
  EMPTY = "empty",
  A = "a",
  B = "b",
}

export type Player = CellState.A | CellState.B;

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

export type Fortress = {
  a: Position & Size;
  b: Position & Size;
};
