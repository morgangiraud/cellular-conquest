"use client";

import React, { createContext, useState, useEffect, useCallback } from "react";

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
} from "./constants";
import { Cell, Game, Grid } from "./Game";
import { computeDiffMap } from "./utils";

interface GameContextProps {
  size: number;
  fortressCfg: fortressCfg;
  gameState: GameState | undefined;
  player: Player | undefined;
  cells: Cell[][] | undefined;
  nextDiffMap: DiffMap | undefined;
  moves: string[];
  nbUpdate: number;
  winner: Player | undefined;
  setPlayer: React.Dispatch<React.SetStateAction<Player | undefined>>;
  setMoves: React.Dispatch<React.SetStateAction<string[]>>;
  handleCellClick: (i: number, j: number) => boolean;
  handleValidation: () => void;
  restart: () => void;
}

export const GameContext = createContext<GameContextProps | undefined>(
  undefined
);

export const GameContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const size = BOARD_SIZE;
  const fortressCfg: fortressCfg = {
    a: { x: (size / 2) | 0, y: 1, width: 1, height: 1 },
    b: { x: (size / 2) | 0, y: size - 2, width: 1, height: 1 },
  };
  const [game, setGame] = useState<Game | undefined>(undefined);

  const [player, setPlayer] = useState<Player | undefined>(undefined);
  const [moves, setMoves] = useState<string[]>([]);
  const [nbUpdate, setNbUpdate] = useState(0);
  const [cells, setCells] = useState<Cell[][] | undefined>(undefined);
  const [nextDiffMap, setNextDiffMap] = useState<DiffMap | undefined>(
    undefined
  );
  const [gameState, setGameState] = useState<GameState>(GameState.INIT);
  const [winner, setWinner] = useState<Player>();

  const restart = () => {
    setGameState(GameState.INIT);

    const game = new Game(size, fortressCfg);
    setGame(game);
    setPlayer(game.initialPlayer);
    setMoves([]);
    setNbUpdate(0);
    setCells(game.grid.cells.map((row) => row.map((cell) => cell.clone())));
    setNextDiffMap(
      computeDiffMap(game.getCellStates(), game.grid.computeNextStates())
    );
    setGameState(
      game.initialPlayer === CellState.A
        ? GameState.PLAYER_A
        : GameState.PLAYER_B
    );
  };

  // Initialize the board
  useEffect(() => {
    restart();
    // The dependency list is empty so this is only run once on mount
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Game state listener
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
        if (nbIter > NB_UPDATE_PER_TURN) {
          clearInterval(interval);
          setNextDiffMap(
            computeDiffMap(game.getCellStates(), game.grid.computeNextStates())
          );
          setPlayer(game.initialPlayer);
          setGameState(
            game.initialPlayer === CellState.A
              ? GameState.PLAYER_A
              : GameState.PLAYER_B
          );
          setNbUpdate(0);
        } else if (winState != false) {
          setWinner(winState);
          clearInterval(interval);
          setPlayer(undefined);
          setGameState(GameState.END);
        }
        nbIter += 1;
        setNbUpdate(nbIter);
      }, (1000 / FRAME_RATE) | 0);
    }
  }, [game, gameState]);

  const handleCellClick = useCallback(
    (i: number, j: number) => {
      if (player === undefined) return false;
      if (cells === undefined) return false;

      const isMoveDone = moves.indexOf(`${i}-${j}`) !== -1;
      if (!isMoveDone && moves.length === NB_MAX_MOVES) return true;

      let newMoves: string[];
      if (isMoveDone) {
        newMoves = moves.filter((move) => move !== `${i}-${j}`);
      } else {
        newMoves = [...moves, `${i}-${j}`];
      }

      const newCell = cells[i][j].clone();
      if (newCell.state === player) {
        newCell.state = CellState.EMPTY;
      } else if (moves.length < NB_MAX_MOVES) {
        newCell.state = player;
      }
      cells[i][j] = newCell;

      setMoves(newMoves);
      setCells(cells);

      const newGrid = new Grid(
        size,
        cells.map((cellRow) => cellRow.map((cell) => cell.state))
      );
      setNextDiffMap(
        computeDiffMap(
          newGrid.cells.map((cellRow) => cellRow.map((cell) => cell.state)),
          newGrid.computeNextStates()
        )
      );

      return false;
    },
    [player, cells, moves, size]
  );

  const handleValidation = useCallback(() => {
    if (game === undefined) return;
    if (cells === undefined) return;
    if (player === undefined) return;

    game.grid.assignCells(cells.map((row) => row.map((cell) => cell.state)));

    setMoves([]);

    setPlayer(player === CellState.A ? CellState.B : CellState.A);
    if (
      gameState === GameState.PLAYER_A &&
      game.initialPlayer === CellState.A
    ) {
      setPlayer(CellState.B);
      setGameState(GameState.PLAYER_B);
    } else if (
      gameState === GameState.PLAYER_A &&
      game.initialPlayer === CellState.B
    ) {
      setPlayer(undefined);
      setGameState(GameState.GAME_OF_LIFE);
    } else if (
      gameState === GameState.PLAYER_B &&
      game.initialPlayer === CellState.B
    ) {
      setPlayer(CellState.A);
      setGameState(GameState.PLAYER_A);
    } else if (
      gameState === GameState.PLAYER_B &&
      game.initialPlayer === CellState.A
    ) {
      setPlayer(undefined);
      setGameState(GameState.GAME_OF_LIFE);
    }
  }, [game, player, gameState, cells, setPlayer, setMoves]);

  return (
    <GameContext.Provider
      value={{
        size,
        gameState,
        player,
        cells,
        nextDiffMap,
        fortressCfg: fortressCfg,
        moves,
        nbUpdate,
        winner,
        setPlayer,
        setMoves,
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
    throw new Error("useWallet must be used within a WalletProvider");
  }

  return context;
}
