import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import type { Database } from "@/lib/database.types";

import { createClient } from "@supabase/supabase-js";

export default async function Home() {
  const rootSupabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? ""
  );
  const supabase = createServerComponentClient<Database>({
    cookies,
  });

  const { data, error } = await rootSupabase
    .from("profiles")
    .select("username, score")
    .order("score", { ascending: false })
    .limit(50);

  if (error) console.error({ error });

  const userResponse = await supabase.auth.getUser();
  const user = userResponse.data.user;

  let myScore;
  if (user) {
    const { data } = await supabase
      .from("profiles")
      .select("score")
      .single<{ score: number }>();

    myScore = data?.score;
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="my-4 text-center text-3xl font-extrabold text-gray-900">
          Leaderboard
        </h2>

        {myScore && <p className="text-center">Your score: {myScore}</p>}

        {data && (
          <>
            <div className="flex flex-col items-center justify-center">
              <div className="flex flex-row mt-4 items-center justify-between w-full">
                <p className="w-1/2 text-center">Username</p>
                <p className="w-1/2 text-center">Score</p>
              </div>
              {data.map(({ username, score }) => {
                return (
                  <div
                    className="flex flex-row mt-4 items-center justify-between w-full"
                    key={username}
                  >
                    <p className="w-1/2 text-center">{username}</p>
                    <p className="w-1/2 text-center">{score}</p>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
