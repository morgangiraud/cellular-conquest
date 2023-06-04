import { Cell } from "@/Game";
import { GameState } from "@/constants";
import { Database } from "@/lib/database.types";
import { REALTIME_LISTEN_TYPES } from "@supabase/supabase-js";

export type SupabaseTables = Database["public"]["Tables"];
export type Games = SupabaseTables["games"];
export type GameMetadata = Games["Row"];

// Lobby
export type LobbyGameStartEvent = {
  type: REALTIME_LISTEN_TYPES.BROADCAST;
  event: "game_start";
  payload: LobbyGameStartPayload;
};

export type LobbyGameStartPayload = {
  game_id: string;
  players: string[];
};

// Game
export type GameMoveEvent = {
  type: REALTIME_LISTEN_TYPES.BROADCAST;
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
};

export type GameValidationEvent = {
  type: REALTIME_LISTEN_TYPES.BROADCAST;
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
