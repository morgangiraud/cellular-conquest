"use client";

import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";

import {
  BOARD_SIZE,
  CellState,
  DiffMap,
  fortressCfg,
  FRAME_RATE,
  GameState,
  NB_MAX_MOVES,
  NB_UPDATE_PER_TURN,
  Player,
  Territory,
} from "@/constants";
import { Cell, Game, Grid } from "@/Game";
import { computeDiffMap, debugLog } from "@/utils";

import {
  GameMetadata,
  GameMoveEvent,
  GameMovePayload,
  GameValidationEvent,
  GameValidationPayload,
} from "@/types/supabase";
import {
  REALTIME_LISTEN_TYPES,
  RealtimeChannel,
  User,
} from "@supabase/supabase-js";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.types";
import { GameContextProps } from "./GameContext";

export const MultiplayerGameContext = createContext<
  GameContextProps | undefined
>(undefined);

interface MultiplayerGameContextProviderProps {
  user: User;
  gameMetadata: GameMetadata;
  children: React.ReactNode;
}

const size = BOARD_SIZE;
const fortressCfg: fortressCfg = {
  a: { x: (size / 2) | 0, y: 1, width: 1, height: 1 },
  b: { x: (size / 2) | 0, y: size - 2, width: 1, height: 1 },
};

export const MultiplayerGameContextProvider = ({
  user,
  gameMetadata,
  children,
}: MultiplayerGameContextProviderProps) => {
  const [game, setGame] = useState<Game | undefined>(undefined);

  const [moves, setMoves] = useState<GameContextProps["moves"]>([[], []]);
  const [playerValidations, setPlayerValidations] = useState<
    [boolean, boolean]
  >([false, false]);
  const [cells, setCells] = useState<Cell[][]>();
  const [nextDiffMap, setNextDiffMap] = useState<DiffMap>();
  const [gameState, setGameState] = useState<GameState>(GameState.INIT);
  const [nbGameStateUpdate, setNbGameStateUpdate] = useState(0);
  const [winner, setWinner] = useState<Player>();

  // Supabase
  const currentPlayerIdx = useMemo(
    () => (user.id === gameMetadata.player_a_id ? 0 : 1),
    [user.id, gameMetadata.player_a_id]
  );
  const supabase = createClientComponentClient<Database>();
  const [gameChannel, setGameChannel] = useState<RealtimeChannel>();

  ////////////////////////////////
  // Listeners callbacks
  ////////////////////////////////
  const onBroadcastMove = useCallback(
    // We cna't type properly those events yet
    // @ts-ignore
    (event: any) => {
      const payload = event.payload as GameMovePayload;
      debugLog("GameMovePayload: ", payload);

      const eventPlayer = payload.player;
      const playerIdx = eventPlayer === GameState.PLAYER_A ? 0 : 1;
      const moveHash = payload.move.join("-");
      const oldMoves = payload.moves;
      const oldCells = payload.cells.map((row) =>
        row.map((cell) => new Cell(cell.state, cell.territory))
      );
      const gameFrozenCells = payload.game_frozen_cells.map((row) =>
        row.map((cell) => new Cell(cell.state, cell.territory))
      );

      const playerMoves = oldMoves[playerIdx];
      const isMoveDone = playerMoves.indexOf(moveHash) !== -1;
      if (!isMoveDone && playerMoves.length === NB_MAX_MOVES) return true;

      let newCell: Cell;
      let newMoves: [string[], string[]] = [[...oldMoves[0]], [...oldMoves[1]]];
      if (isMoveDone) {
        newMoves[playerIdx] = playerMoves.filter((move) => move !== moveHash);
        newCell = gameFrozenCells[payload.move[0]][payload.move[1]].clone();
      } else {
        newMoves[playerIdx] = [...playerMoves, moveHash];
        newCell = oldCells[payload.move[0]][payload.move[1]].clone();
        if (newCell.state === CellState.EMPTY) {
          newCell.state =
            eventPlayer === GameState.PLAYER_A ? CellState.A : CellState.B;
          newCell.territory =
            eventPlayer === GameState.PLAYER_A ? Territory.A : Territory.B;
        } else {
          newCell.state = CellState.EMPTY;
          newCell.territory =
            eventPlayer === GameState.PLAYER_A ? Territory.A : Territory.B;
        }
      }
      oldCells[payload.move[0]][payload.move[1]] = newCell;

      setMoves(newMoves);
      setCells(oldCells);

      const newGrid = new Grid(
        size,
        oldCells.map((cellRow) => cellRow.map((cell) => cell.state))
      );
      setNextDiffMap(
        computeDiffMap(
          newGrid.cells.map((cellRow) => cellRow.map((cell) => cell.state)),
          newGrid.computeNextStates()
        )
      );
    },
    []
  );

  const onBroadcastValidation = useCallback(
    // We cna't type properly those events yet
    // @ts-ignore
    (event: any) => {
      if (game === undefined) return;
      const payload = event.payload as GameValidationPayload;
      debugLog("GameValidationPayload: ", payload);

      const eventPlayer = payload.player;
      const newPlayerValidations = payload.playerValidations;
      const cells = payload.cells.map((row) =>
        row.map((cell) => new Cell(cell.state, cell.territory))
      );

      game.grid.assignCells(cells.map((row) => row.map((cell) => cell.state)));
      if (eventPlayer === GameState.PLAYER_A) {
        if (currentPlayerIdx === 0) {
          setGameState(GameState.PLAYER_A_WAITING);
        }
      } else {
        if (currentPlayerIdx === 1) {
          setGameState(GameState.PLAYER_B_WAITING);
        }
      }
      setPlayerValidations(newPlayerValidations);
    },
    [game, currentPlayerIdx]
  );

  ////////////////////////////////
  // Action callbacks
  ////////////////////////////////
  const handleCellClick = useCallback(
    (i: number, j: number) => {
      if (!game) return;
      if (!gameChannel) return;
      if (!cells) return;

      gameChannel.send({
        type: REALTIME_LISTEN_TYPES.BROADCAST,
        event: "move",
        payload: {
          player: gameState,
          move: [i, j],
          moves,
          cells,
          game_frozen_cells: game.grid.cells,
        },
      } as GameMoveEvent);
    },
    [game, gameState, gameChannel, moves, cells]
  );

  const handleValidation = useCallback(() => {
    if (gameChannel === undefined) return;

    const newPlayerValidations: [boolean, boolean] = [...playerValidations];
    newPlayerValidations[currentPlayerIdx] = true;

    gameChannel.send({
      type: REALTIME_LISTEN_TYPES.BROADCAST,
      event: "validation",
      payload: {
        player: gameState,
        playerValidations: newPlayerValidations,
        cells,
      },
    } as GameValidationEvent);
  }, [gameChannel, gameState, currentPlayerIdx, playerValidations, cells]);

  ////////////////////////////////
  // Helpers
  ////////////////////////////////
  const restart = useCallback(() => {
    setGameState(GameState.INIT);

    const game = new Game(size, fortressCfg);
    setGame(game);
    setMoves([[], []]);
    setPlayerValidations([false, false]);
    setCells(game.grid.cells.map((row) => row.map((cell) => cell.clone())));
    setNextDiffMap(
      computeDiffMap(game.getCellStates(), game.grid.computeNextStates())
    );
    setNbGameStateUpdate(0);
    setGameState(
      currentPlayerIdx === 0 ? GameState.PLAYER_A : GameState.PLAYER_B
    );
  }, [currentPlayerIdx]);

  ////////////////////////////////
  // Effects
  ////////////////////////////////

  useEffect(() => {
    debugLog("Listen to game channel");
    const gameChannel = supabase.channel(`game-${gameMetadata.id}`, {
      config: {
        broadcast: {
          self: true,
        },
      },
    });
    gameChannel.on("broadcast", { event: "move" }, onBroadcastMove);
    gameChannel.on("broadcast", { event: "validation" }, onBroadcastValidation);
    gameChannel.subscribe();
    setGameChannel(gameChannel);

    return () => {
      debugLog("Unlisten to game channel");
      setGameChannel(undefined);
      supabase.removeChannel(gameChannel);
    };
  }, [supabase, gameMetadata.id, onBroadcastMove, onBroadcastValidation]);

  useEffect(() => {
    if (game === undefined) return;

    if (gameState === GameState.GAME_OF_LIFE) {
      const updateGameState = () => {
        game.grid.update();
        setCells(game.grid.cells.map((row) => row.map((cell) => cell.clone())));

        return game.checkWin();
      };

      setNextDiffMap(undefined);
      let nbIter = 0;
      const interval = setInterval(function () {
        if (nbIter >= NB_UPDATE_PER_TURN) {
          clearInterval(interval);

          setNextDiffMap(
            computeDiffMap(game.getCellStates(), game.grid.computeNextStates())
          );
          setNbGameStateUpdate(0);
          setGameState(
            user.id === gameMetadata.player_a_id
              ? GameState.PLAYER_A
              : GameState.PLAYER_B
          );
          return;
        }

        const winState = updateGameState();
        if (winState != false) {
          clearInterval(interval);

          setNbGameStateUpdate(0);
          setWinner(winState);
          setGameState(GameState.END);

          if (
            (user.id === gameMetadata.player_a_id &&
              winState === CellState.A) ||
            (user.id === gameMetadata.player_b_id && winState === CellState.B)
          ) {
            supabase
              .from("games")
              .update({ winner_id: user.id })
              .eq("id", gameMetadata.id)
              .then((val) => {
                console.log("call made", { val });
              });
          }
          return;
        }

        nbIter += 1;
        setNbGameStateUpdate(nbIter);
      }, (1000 / FRAME_RATE) | 0);
    }
  }, [game, gameState, user.id, gameMetadata.player_a_id]);

  useEffect(() => {
    if (playerValidations[0] && playerValidations[1]) {
      setMoves([[], []]);
      setPlayerValidations([false, false]);
      setGameState(GameState.GAME_OF_LIFE);
    }
  }, [playerValidations]);

  useEffect(() => {
    restart();
  }, [restart]);

  return (
    <MultiplayerGameContext.Provider
      value={{
        size,
        gameState,
        cells,
        nextDiffMap,
        fortressCfg: fortressCfg,
        moves,
        nbGameStateUpdate,
        winner,
        handleCellClick,
        handleValidation,
        restart,
      }}
    >
      {children}
    </MultiplayerGameContext.Provider>
  );
};

export function useMultiplayerGameData() {
  const context = React.useContext(MultiplayerGameContext);

  if (context === undefined) {
    throw new Error(
      "useMultiplayerGameData must be used within a WalletProvider"
    );
  }

  return context;
}
