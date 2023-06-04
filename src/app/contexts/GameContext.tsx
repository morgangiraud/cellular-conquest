"use client";

import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  use,
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
} from "@/constants";
import { Cell, Game, Grid } from "@/Game";
import { computeDiffMap, debugLog } from "@/utils";
import { GameMovePayload, GameValidationPayload } from "@/types/supabase";

export interface GameContextProps {
  size: number;
  fortressCfg: fortressCfg;
  gameState: GameState | undefined;
  cells: Cell[][] | undefined;
  nextDiffMap: DiffMap | undefined;
  moves: [string[], string[]];
  nbGameStateUpdate: number;
  winner: Player | undefined;
  handleCellClick: (i: number, j: number) => boolean;
  handleValidation: () => void;
  restart: () => void;
}

export const GameContext = createContext<GameContextProps | undefined>(
  undefined
);

interface GameContextProviderProps {
  children: React.ReactNode;
}

const size = BOARD_SIZE;
const fortressCfg: fortressCfg = {
  a: { x: (size / 2) | 0, y: 1, width: 1, height: 1 },
  b: { x: (size / 2) | 0, y: size - 2, width: 1, height: 1 },
};

export const GameContextProvider = ({ children }: GameContextProviderProps) => {
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

  ////////////////////////////////
  // Listener callbacks
  ////////////////////////////////
  const onMove = useCallback((payload: GameMovePayload) => {
    debugLog("GameMovePayload: ", payload);

    const eventPlayer = payload.player;
    const playerIdx = eventPlayer === GameState.PLAYER_A ? 0 : 1;
    const moveHash = payload.move.join("-");
    const oldMoves = payload.moves;
    const oldCells = payload.cells;

    const playerMoves = oldMoves[playerIdx];
    const isMoveDone = playerMoves.indexOf(moveHash) !== -1;
    if (!isMoveDone && playerMoves.length === NB_MAX_MOVES) return true;

    const newCell = oldCells[payload.move[0]][payload.move[1]].clone();

    let newMoves: [string[], string[]] = [[...oldMoves[0]], [...oldMoves[1]]];
    if (isMoveDone) {
      newMoves[playerIdx] = playerMoves.filter((move) => move !== moveHash);
      newCell.state = CellState.EMPTY;
    } else {
      newMoves[playerIdx] = [...playerMoves, moveHash];
      newCell.state =
        eventPlayer === GameState.PLAYER_A ? CellState.A : CellState.B;
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

    return false;
  }, []);

  const onValidation = useCallback(
    (payload: GameValidationPayload) => {
      if (game === undefined) return;
      debugLog("GameValidationPayload: ", payload);

      const eventPlayer = payload.player;
      const newPlayerValidations = payload["playerValidations"];
      const cells = payload.cells;

      game.grid.assignCells(cells.map((row) => row.map((cell) => cell.state)));
      setGameState(
        eventPlayer === GameState.PLAYER_A
          ? GameState.PLAYER_B
          : GameState.PLAYER_A
      );
      setPlayerValidations(newPlayerValidations);
    },
    [game]
  );

  ////////////////////////////////
  // Action callbacks
  ////////////////////////////////
  const handleCellClick = useCallback(
    (i: number, j: number) => {
      return onMove({
        player: gameState,
        move: [i, j],
        moves,
        cells,
      } as GameMovePayload);
    },
    [gameState, onMove, moves, cells]
  );

  const handleValidation = useCallback(() => {
    const newPlayerValidations: [boolean, boolean] = [...playerValidations];
    if (gameState === GameState.PLAYER_A) {
      newPlayerValidations[0] = true;
    } else {
      newPlayerValidations[1] = true;
    }

    onValidation({
      player: gameState,
      playerValidations: newPlayerValidations,
      cells,
    } as GameValidationPayload);
  }, [gameState, playerValidations, cells, onValidation]);

  ////////////////////////////////
  // Helpers
  ////////////////////////////////
  const restart = () => {
    setGameState(GameState.INIT);

    const game = new Game(size, fortressCfg);
    setGame(game);
    setMoves([[], []]);
    setCells(game.grid.cells.map((row) => row.map((cell) => cell.clone())));
    setNextDiffMap(
      computeDiffMap(game.getCellStates(), game.grid.computeNextStates())
    );
    setNbGameStateUpdate(0);
    setGameState(
      game.initialPlayer === CellState.A
        ? GameState.PLAYER_A
        : GameState.PLAYER_B
    );
  };

  ////////////////////////////////
  // Effects
  ////////////////////////////////
  useEffect(() => {
    if (game === undefined) return;

    if (gameState === GameState.GAME_OF_LIFE) {
      const updateGameState = () => {
        game.grid.update();
        setCells([...game.grid.cells]);

        return game.checkWin();
      };

      setNextDiffMap(undefined);
      let nbIter = 0;
      const interval = setInterval(function () {
        const winState = updateGameState();

        if (winState != false) {
          clearInterval(interval);

          setNbGameStateUpdate(0);
          setWinner(winState);
          setGameState(GameState.END);
          return;
        }

        if (nbIter > NB_UPDATE_PER_TURN) {
          clearInterval(interval);

          setNextDiffMap(
            computeDiffMap(game.getCellStates(), game.grid.computeNextStates())
          );
          setNbGameStateUpdate(0);
          setGameState(
            game.initialPlayer === CellState.A
              ? GameState.PLAYER_A
              : GameState.PLAYER_B
          );
          return;
        }

        nbIter += 1;
        setNbGameStateUpdate(nbIter);
      }, (1000 / FRAME_RATE) | 0);
    }
  }, [game, gameState]);

  useEffect(() => {
    if (playerValidations[0] && playerValidations[1]) {
      setMoves([[], []]);
      setPlayerValidations([false, false]);
      setGameState(GameState.GAME_OF_LIFE);
    }
  }, [playerValidations]);

  useEffect(() => {
    restart();
  }, []);

  return (
    <GameContext.Provider
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
    </GameContext.Provider>
  );
};

export function useGameData() {
  const context = React.useContext(GameContext);

  if (context === undefined) {
    throw new Error("useGameData must be used within a WalletProvider");
  }

  return context;
}