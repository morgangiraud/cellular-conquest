import { Cell } from "@/Game";
import { GameState } from "@/constants";
import { Database } from "@/lib/database.types";

export type SupabaseTables = Database["public"]["Tables"];
export type Games = SupabaseTables["games"];
export type GameMetadata = Games["Row"];

// Lobby
export type LobbyGameStartEvent = {
  type: "broadcast";
  event: "game_start";
  payload: LobbyGameStartPayload;
};

export type LobbyGameStartPayload = {
  game_id: number;
  players: string[];
};

// Game
export type GameMoveEvent = {
  type: "broadcast";
  event: "move";
  payload: GameMovePayload;
};

export type GameMovePayload = {
  player: Omit<
    GameState,
    GameState.INIT | GameState.GAME_OF_LIFE | GameState.END
  >;
  move: [number, number];
  moves: [string[], string[]];
  cells: Cell[][];
  game_frozen_cells: Cell[][];
};

export type GameValidationEvent = {
  type: "broadcast";
  event: "validation";
  payload: GameValidationPayload;
};

export type GameValidationPayload = {
  player: Omit<
    GameState,
    GameState.INIT | GameState.GAME_OF_LIFE | GameState.END
  >;
  playerValidations: [boolean, boolean];
  cells: Cell[][];
};
