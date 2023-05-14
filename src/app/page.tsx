"use client";

import Button from "@/components/Button";
import GridView from "../components/GridView";
import { useGameData } from "@/GameContext";
import { GameState } from "@/constants";
import { useEffect } from "react";

export default function Home() {
  const {
    size,
    gameState,
    cells,
    statusText,
    handleCellClick,
    handleValidation,
  } = useGameData();

  useEffect(() => {
    const handleKeyDown = (ev: KeyboardEvent) => {
      ev.stopPropagation();
      ev.preventDefault();

      if (ev.key === " ") {
        handleValidation();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleValidation]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl mb-4">Cellular conquest</h1>
        <p>{statusText}</p>
        <GridView size={size} cells={cells} onCellClick={handleCellClick} />
        {(gameState === GameState.PLAYER_A ||
          gameState === GameState.PLAYER_B) && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleValidation}
          >
            Validate
          </Button>
        )}
      </div>
    </div>
  );
}
