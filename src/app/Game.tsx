"use client";

import Button from "@/app/components/Button";
import GridView from "./components/GridView";
import { useGameData } from "@/app/contexts/GameContext";
import { CellState, GameState, NB_UPDATE_PER_TURN, Player } from "@/constants";
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
      <h2 className="my-4 text-center text-2xl font-extrabold text-gray-900">
        Offline mode
      </h2>
      <GridView
        size={size}
        fortressCfg={fortressCfg}
        gameState={gameState}
        cells={cells}
        nextDiffMap={nextDiffMap}
        handleCellClick={handleCellClick}
      />

      {/* <div className="relative my-1">
          <DashedLine
            strokeWidth={2}
            strokeColor="var(--other)"
            fillPercentage={((nbGameStateUpdate / NB_UPDATE_PER_TURN) * 100) | 0}
          />
        </div> */}

      <p
        className={`text-center text-xl font-semibold m-1 ${
          gameState === GameState.PLAYER_A ? "" : ""
        }`}
      >
        {statusText()}
      </p>

      <div className="flex justify-center">
        {gameState === GameState.PLAYER_A ||
        gameState === GameState.PLAYER_B ? (
          <Button
            className="mx-auto"
            variant="contained"
            gameState={gameState}
            onClick={handleValidation}
          >
            Validate your moves{" "}
            {moves[gameState === GameState.PLAYER_A ? 0 : 1].length} / 5
          </Button>
        ) : (
          <Loader />
        )}
        {gameState === GameState.END && (
          <Button variant="contained" onClick={restart}>
            Restart
          </Button>
        )}
      </div>
    </>
  );
}
