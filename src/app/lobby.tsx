"use client";

import { useCallback, useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { REALTIME_LISTEN_TYPES, RealtimeChannel } from "@supabase/supabase-js";

import Button from "./components/Button";

import type { Database } from "@/lib/database.types";
import { debugLog } from "@/utils";
import { LobbyGameStartPayload } from "@/types/supabase";
import { debug } from "console";

const PRESENCE_KEY = "ceco-lobby";
interface LobbyProps {
  sessionUserId: string;
  startGame: (gameId: string) => void;
}

export default function Lobby({ sessionUserId, startGame }: LobbyProps) {
  const supabase = createClientComponentClient<Database>();

  const [userState, setUserState] = useState<string[]>([]);
  const [lobbyChannel, setLobbyChannel] = useState<RealtimeChannel>();

  useEffect(() => {
    debugLog("Listen to lobby channel");
    const lobbyChannel = supabase.channel("lobby", {
      config: {
        broadcast: {
          self: true,
        },
        presence: { key: PRESENCE_KEY },
      },
    });

    lobbyChannel.on("presence", { event: "sync" }, () => {
      const presenceState = lobbyChannel.presenceState<{ user_id: string }>();

      if (presenceState[PRESENCE_KEY]) {
        const userIds = presenceState[PRESENCE_KEY].map(
          (value) => value.user_id
        );

        setUserState(userIds);
      }
    });

    lobbyChannel.on("broadcast", { event: "game_start" }, (event) => {
      const payload = event.payload as LobbyGameStartPayload;

      const players = payload["players"];
      if (players.indexOf(sessionUserId) != -1) {
        debugLog("Game should start: ", payload);
        const gameId = payload["game_id"];
        startGame(gameId);
      }
    });

    lobbyChannel.subscribe(async (status, err) => {
      if (status == "SUBSCRIBED") {
        await lobbyChannel.track({ user_id: sessionUserId });
        setLobbyChannel(lobbyChannel);
      }
    });

    return () => {
      debugLog("Unlisten from lobby channel");
      setLobbyChannel(undefined);
      supabase.removeChannel(lobbyChannel);
    };
  }, [supabase, sessionUserId, startGame]);

  const handleStartGame = useCallback(async () => {
    if (lobbyChannel === undefined) return;
    if (userState.length < 2) return;

    // find first user which is not me
    const otherUserId = userState.find((userId) => userId !== sessionUserId);
    if (!otherUserId) return;

    // Grame new game in DB
    const { data: game, error } = await supabase
      .from("games")
      .insert({
        player_a_id: sessionUserId,
        player_b_id: otherUserId,
      })
      .select("*")
      .single();

    if (error) {
      console.error(error);
      return;
    }

    const event = {
      type: REALTIME_LISTEN_TYPES.BROADCAST,
      event: "game_start",
      payload: {
        game_id: game.id,
        players: [sessionUserId, otherUserId],
      },
    };
    lobbyChannel.send(event);
  }, [lobbyChannel, sessionUserId, supabase, userState]);

  return (
    <div className="flex items-center justify-center mt-8">
      <div className="max-w-md w-full space-y-8 bg-white p-6 rounded-lg shadow-md">
        <div>
          <h2 className="my-4 text-center text-3xl font-extrabold text-gray-900">
            Welcome to Cellular conquest lobby!
          </h2>
          <p className="text-sm">
            As soon as 2 players (or more) you can smash out the{" "}
            <b>Start game!</b>
            button!
          </p>
        </div>
        <div>
          <p className="text-xl">List of Currently Logged in Users:</p>
          <div className="mt-2">
            {userState.map((v, k) => (
              <p key={k} className="my-2 text-gray-700">
                Player: {v}
              </p>
            ))}
          </div>
        </div>
        {userState.length < 2 ? (
          <p className="text-red-500">Waiting for more players to join...</p>
        ) : (
          <div>
            <Button onClick={handleStartGame}>Start game!</Button>
          </div>
        )}
        <hr className="" />
        <p className="text-center text-sm mt-1">
          Sign out to get back to the offline game
        </p>
      </div>
    </div>
  );
}
