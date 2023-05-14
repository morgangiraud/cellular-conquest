"use client";

import React, { createContext, useState, useEffect, useCallback } from "react";

import {
  BOARD_SIZE,
  CellState,
  fortressCfg,
  FRAME_RATE,
  GameState,
  NB_MAX_MOVES,
  NB_UPDATE_PER_TURN,
  Player,
} from "./constants";
import { Cell, Game } from "./Game";

export type SelectedCellsCounterType = Record<Player, number>;

interface GameContextProps {
  size: number;
  fortressCfg: fortressCfg;
  gameState: GameState | undefined;
  player: Player | undefined;
  cells: Cell[][] | undefined;
  selectedCellsCounter: SelectedCellsCounterType;
  statusText: string;
  setPlayer: React.Dispatch<React.SetStateAction<Player | undefined>>;
  setSelectedCellsCounter: React.Dispatch<
    React.SetStateAction<SelectedCellsCounterType>
  >;
  handleCellClick: (i: number, j: number) => boolean;
  handleValidation: () => void;
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

  const [gameState, setGameState] = useState<GameState>(GameState.INIT);
  const [game, setGame] = useState<Game | undefined>(undefined);
  const [player, setPlayer] = useState<Player | undefined>(undefined);
  const [selectedCellsCounter, setSelectedCellsCounter] =
    useState<SelectedCellsCounterType>({
      a: 0,
      b: 0,
    });
  const [cells, setCells] = useState<Cell[][] | undefined>(undefined);

  const [statusText, setStatusText] = useState("");

  // Initialize the board
  useEffect(() => {
    const game = new Game(size, fortressCfg);

    setGame(game);
    setPlayer(game.initialPlayer);
    setCells([...game.grid.cells]);
    setGameState(
      game.initialPlayer === CellState.A
        ? GameState.PLAYER_A
        : GameState.PLAYER_B
    );
    // The dependency list is empty so this is only run once on mount
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Player listener
  useEffect(() => {
    if (player === undefined) return;

    setStatusText(`Waiting for player ${player} to choose their squares`);
  }, [player]);

  // Game state listener
  useEffect(() => {
    if (game === undefined) return;

    if (gameState === GameState.GAME_OF_LIFE) {
      const updateGameState = () => {
        game.grid.update();
        setCells([...game.grid.cells]);

        return game.checkWin();
      };

      let iter = 0;
      const interval = setInterval(function () {
        const winState = updateGameState();
        iter++;
        if (iter > NB_UPDATE_PER_TURN) {
          clearInterval(interval);
          setPlayer(game.initialPlayer);
          setGameState(
            game.initialPlayer === CellState.A
              ? GameState.PLAYER_A
              : GameState.PLAYER_B
          );
        } else if (winState != false) {
          clearInterval(interval);
          setStatusText(`Player ${winState} wins!`);
          setPlayer(undefined);
          setGameState(GameState.END);
        }
      }, (1000 / FRAME_RATE) | 0);
    }
  }, [game, gameState]);

  const handleCellClick = useCallback(
    (i: number, j: number) => {
      if (player === undefined) return false;
      if (cells === undefined) return false;

      console.log(`handleCellClick: ${i}, ${j}`);

      let maximumReached = false;
      const newCells = [...cells];
      if (newCells[i][j].state === player) {
        newCells[i][j].state = CellState.EMPTY;
        setSelectedCellsCounter({
          ...selectedCellsCounter,
          [player]: selectedCellsCounter[player] - 1,
        });
      } else if (selectedCellsCounter[player] < NB_MAX_MOVES) {
        newCells[i][j].state = player;
        setSelectedCellsCounter({
          ...selectedCellsCounter,
          [player]: selectedCellsCounter[player] + 1,
        });
      } else {
        maximumReached = true;
      }
      setCells(newCells);

      return maximumReached;
    },
    [player, cells, selectedCellsCounter]
  );

  const handleValidation = useCallback(() => {
    if (game === undefined) return;
    if (cells === undefined) return;
    if (player === undefined) return;

    game.grid.assignCells(cells.map((row) => row.map((cell) => cell.state)));

    setSelectedCellsCounter((prevState) => ({
      ...prevState,
      [player]: 0,
    }));

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
  }, [game, player, gameState, cells, setPlayer, setSelectedCellsCounter]);

  return (
    <GameContext.Provider
      value={{
        size,
        gameState,
        player,
        cells,
        fortressCfg: fortressCfg,
        selectedCellsCounter,
        statusText,
        setPlayer,
        setSelectedCellsCounter,
        handleCellClick,
        handleValidation,
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
