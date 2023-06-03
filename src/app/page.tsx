import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import Game from "./Game";
import { GameContextProvider } from "./GameContext";
import AboutModal from "./components/AboutModal";
import Legend from "./components/Legend";
import Login from "./login";

// import type { Database } from '@/lib/database.types'

export default async function Home() {
  const supabase = createServerComponentClient({
    cookies,
  });

  return (
    <div className="flex items-center justify-center max-h-fit overflow-auto">
      <div className="container mx-auto max-w-xl">
        <div className="flex">
          <h1 className="text-2xl ml-0 mr-auto my-auto">Cellular conquest</h1>
          <div className="flex">
            <AboutModal />
            <Login />
          </div>
        </div>

        <GameContextProvider>
          <Game />
        </GameContextProvider>

        <Legend />
      </div>
    </div>
  );
}
