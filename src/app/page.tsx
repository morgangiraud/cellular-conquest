"use client";

import Button from "@/components/Button";
import GridView from "../components/GridView";
import { useGameData } from "@/GameContext";
import { GameState } from "@/constants";
import { useEffect } from "react";
import Legend from "@/components/Legend";
import AboutModal from "@/components/AboutModal";

export default function Home() {
  const { gameState, statusText, handleValidation, resetState, moves } =
    useGameData();

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

  return (
    <div className="flex items-center justify-center max-h-fit overflow-auto">
      <div className="container mx-auto max-w-xl">
        <div className="flex">
          <h1 className="text-2xl ml-0 mr-auto my-auto">Cellular conquest</h1>
          <AboutModal />
        </div>

        <p className="text-center">{statusText}</p>

        <GridView />
        <div className="flex justify-center">
          {(gameState === GameState.PLAYER_A ||
            gameState === GameState.PLAYER_B) && (
            <Button
              className="mx-auto"
              variant="contained"
              color="primary"
              onClick={handleValidation}
            >
              Validate your moves {moves.length} / 5
            </Button>
          )}
          {gameState === GameState.END && (
            <Button variant="contained" color="primary" onClick={resetState}>
              Restart
            </Button>
          )}
        </div>
        <Legend />
      </div>
    </div>
  );
}
