import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/database.types";
import { getSupabaseServerClient } from "@/lib/supabase/server";

function UnavailableLeaderboard() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full space-y-4 bg-white p-6 rounded-lg shadow-md">
        <h2 className="my-4 text-center text-3xl font-extrabold text-gray-900">
          Leaderboard
        </h2>
        <p className="text-center text-gray-700">
          Leaderboard is unavailable until Supabase environment variables are
          configured and reachable.
        </p>
      </div>
    </div>
  );
}

export default async function Home() {
  const hasSupabaseClientEnv = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
  const hasSupabaseServiceRoleEnv = Boolean(
    process.env.SUPABASE_SERVICE_ROLE_KEY,
  );

  if (!hasSupabaseClientEnv || !hasSupabaseServiceRoleEnv) {
    return <UnavailableLeaderboard />;
  }

  try {
    const rootSupabase = createClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL as string,
      process.env.SUPABASE_SERVICE_ROLE_KEY as string,
    );
    const supabase = await getSupabaseServerClient();

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
      const { data, error: myScoreError } = await supabase
        .from("profiles")
        .select("score")
        .single<{ score: number }>();

      if (myScoreError) console.error({ myScoreError });
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
  } catch (error) {
    console.error("Unable to load leaderboard data.", error);
    return <UnavailableLeaderboard />;
  }
}
