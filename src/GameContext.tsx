"use client";

import React, { createContext, useState, useEffect, useCallback } from "react";

import { CellState, Fortress, GameState, Player } from "./constants";
import { Game } from "./Game";

export type SelectedCellsCounterType = Record<Player, number>;

interface GameContextProps {
  size: number;
  gameState: GameState | undefined;
  player: Player | undefined;
  cells: CellState[][] | undefined;
  fortress: Fortress | undefined;
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
  const size = 20;
  const nbIter = 10;

  const [gameState, setGameState] = useState<GameState>(GameState.INIT);
  const [game, setGame] = useState<Game | undefined>(undefined);
  const [player, setPlayer] = useState<Player | undefined>(undefined);
  const [selectedCellsCounter, setSelectedCellsCounter] =
    useState<SelectedCellsCounterType>({
      a: 0,
      b: 0,
    });
  const [cells, setCells] = useState<CellState[][] | undefined>(undefined);

  const [statusText, setStatusText] = useState("");

  // Initialize the board
  useEffect(() => {
    const fortress: Fortress = {
      a: { x: (size / 2) | 0, y: 1, width: 1, height: 1 },
      b: { x: (size / 2) | 0, y: size - 2, width: 1, height: 1 },
    };
    const game = new Game(size, fortress);

    setGame(game);
    setPlayer(game.initialPlayer);
    setCells(game.getCellStates());
    setGameState(
      game.initialPlayer === CellState.A
        ? GameState.PLAYER_A
        : GameState.PLAYER_B
    );
  }, []);

  useEffect(() => {
    if (player === undefined) return;

    setStatusText(`Waiting for player ${player} to choose their squares`);
  }, [player]);

  const handleCellClick = useCallback(
    (i: number, j: number) => {
      if (player === undefined) return false;
      if (cells === undefined) return false;

      console.log(`handleCellClick: ${i}, ${j}`);

      let maximumReached = false;
      const newCells = [...cells];
      if (newCells[i][j] === player) {
        newCells[i][j] = CellState.EMPTY;
        setSelectedCellsCounter({
          ...selectedCellsCounter,
          [player]: selectedCellsCounter[player] - 1,
        });
      } else if (selectedCellsCounter[player] < 3) {
        newCells[i][j] = player;
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

    game.grid.assignCells(cells);

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

  useEffect(() => {
    if (game === undefined) return;

    if (gameState === GameState.GAME_OF_LIFE) {
      const updateGameState = () => {
        game.grid.update();
        setCells(game.getCellStates());

        return game.checkWin();
      };

      let iter = 0;
      const interval = setInterval(function () {
        const winState = updateGameState();
        iter++;
        if (iter > nbIter) {
          clearInterval(interval);
          setPlayer(game.initialPlayer);
          setGameState(
            game.initialPlayer === CellState.A
              ? GameState.PLAYER_A
              : GameState.PLAYER_B
          );
        } else if (winState != false) {
          clearInterval(interval);
          setStatusText(`Player ${game.checkWin()} wins!`);
          setPlayer(undefined);
          setGameState(GameState.END);
        }
      }, 100);
    }
  }, [game, gameState]);

  return (
    <GameContext.Provider
      value={{
        size,
        gameState,
        player,
        cells,
        fortress: game?.fortress,
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
