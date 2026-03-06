import { getSupabaseServerClient } from "@/lib/supabase/server";

import MultiPlayerSwitch from "./MultiPlayerSwitch";

export default async function Home() {
  const hasSupabaseClientEnv = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );

  if (!hasSupabaseClientEnv) {
    return <MultiPlayerSwitch user={null} />;
  }

  try {
    const supabase = await getSupabaseServerClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    return <MultiPlayerSwitch user={user} />;
  } catch (error) {
    console.error("Unable to resolve Supabase user context.", error);
    return <MultiPlayerSwitch user={null} />;
  }
}
