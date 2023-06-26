"use client";

import Button from "@/app/components/Button";
import GridView from "./components/GridView";
import { useGameData } from "@/app/contexts/GameContext";
import {
  CellState,
  GameState,
  NB_MAX_MOVES,
  NB_UPDATE_PER_TURN,
  Player,
} from "@/constants";
import { useEffect } from "react";
import Loader from "@/app/components/Loader";
import DashedLine from "@/app/svgs/DashedLine";

export default function Game() {
  const {
    size,
    fortressCfg,
    gameState,
    cells,
    nextDiffMap,
    moves,
    nbGameStateUpdate,
    winner,
    handleValidation,
    handleCellClick,
    restart,
  } = useGameData();

  useEffect(() => {
    if (gameState === undefined) return;

    const handleKeyDown = (ev: KeyboardEvent) => {
      if (ev.key === " ") {
        ev.stopPropagation();
        ev.preventDefault();

        handleValidation();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameState, handleValidation]);

  function statusText() {
    switch (gameState) {
      case GameState.INIT:
        return <>Click on a cell to start!</>;
      case GameState.PLAYER_A:
        return (
          <>
            Player <span className="text-cell-a">A</span> to play!
          </>
        );
      case GameState.PLAYER_A_WAITING:
        return (
          <>
            Waiting for player <span className="text-cell-b">B</span>!
          </>
        );
      case GameState.PLAYER_B:
        return (
          <>
            Player <span className="text-cell-b">B</span> to play!
          </>
        );
      case GameState.PLAYER_B_WAITING:
        return (
          <>
            Waiting for player <span className="text-cell-a">A</span>!
          </>
        );
      case GameState.END:
        return winner === CellState.A ? <>A winned!</> : <>B winned!</>;
    }
  }

  return (
    <>
      <h2 className="flex items-center justify-center my-4 text-center text-2xl font-extrabold text-gray-900">
        Offline mode
      </h2>
      <GridView
        size={size}
        fortressCfg={fortressCfg}
        gameState={gameState}
        cells={cells}
        nextDiffMap={nextDiffMap}
        moves={moves}
        handleCellClick={handleCellClick}
      />

      <div className="max-w-[300px] md:max-w-sm lg:max-w-md mx-auto h-4 bg-gray-200 rounded-full my-4 overflow-hidden">
        <div
          style={{
            width: `${
              ((nbGameStateUpdate === 0 ? 1 : nbGameStateUpdate) /
                NB_UPDATE_PER_TURN) *
              100
            }%`,
          }}
          className={`h-full text-xs text-center text-white ${
            nbGameStateUpdate === 0
              ? "bg-other border-r-2 border-dashed border-blue-500"
              : "bg-blue-500"
          } rounded-full`}
        >
          {nbGameStateUpdate}/{NB_UPDATE_PER_TURN}
        </div>
      </div>

      <p className={`text-center text-xl font-semibold m-1`}>{statusText()}</p>

      <div className="flex justify-center">
        {(gameState === GameState.PLAYER_A ||
          gameState === GameState.PLAYER_B) && (
          <Button
            className="mx-auto"
            variant="contained"
            gameState={gameState}
            onClick={handleValidation}
          >
            Validate your moves{" "}
            {moves[gameState === GameState.PLAYER_A ? 0 : 1].length} /{" "}
            {NB_MAX_MOVES}
          </Button>
        )}
        {(gameState === GameState.PLAYER_A_WAITING ||
          gameState === GameState.PLAYER_B_WAITING ||
          gameState === GameState.GAME_OF_LIFE) && <Loader />}
        {gameState === GameState.END && (
          <Button variant="contained" onClick={restart}>
            Restart
          </Button>
        )}
      </div>
    </>
  );
}
