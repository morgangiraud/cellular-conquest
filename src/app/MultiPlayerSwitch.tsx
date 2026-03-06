"use client";

import { useState } from "react";
import { User } from "@supabase/supabase-js";

import Game from "./Game";
import { GameContextProvider } from "./contexts/GameContext";
import Lobby from "./lobby";
import Legend from "./components/Legend";
import { MultiplayerGameContextProvider } from "./contexts/MultiplayerGameContext";
import { GameMetadata } from "@/types/supabase";
import MultiplayerGame from "./MultiplayerGame";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser";

interface MultiPlayerSwitchProps {
  user: User | null;
}

export default function MultiPlayerSwitch({ user }: MultiPlayerSwitchProps) {
  const [gameMetadata, setGameMetadata] = useState<GameMetadata>();
  const [hasGameStarted, setHasGameStarted] = useState(false);

  const startGame = async (gameId: number) => {
    const supabase = getSupabaseBrowserClient();

    const { data: gameMetadata, error } = await supabase
      .from("games")
      .select("*")
      .eq("id", gameId)
      .single();

    if (error) {
      console.error(error);
      return;
    }

    setGameMetadata(gameMetadata);
    setHasGameStarted(true);
  };

  const resetSwitch = () => {
    setGameMetadata(undefined);
    setHasGameStarted(false);
  };

  return (
    <>
      {user ? (
        // Multiplayer
        <>
          {hasGameStarted && gameMetadata ? (
            <>
              {" "}
              <MultiplayerGameContextProvider
                user={user}
                gameMetadata={gameMetadata}
              >
                <MultiplayerGame resetSwitch={resetSwitch} />
              </MultiplayerGameContextProvider>
              <Legend />
            </>
          ) : (
            <Lobby sessionUserId={user.id} startGame={startGame} />
          )}
        </>
      ) : (
        // SinglePlayer
        <>
          {" "}
          <GameContextProvider>
            <Game />
          </GameContextProvider>
          <Legend />
        </>
      )}
    </>
  );
}
