import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import type { Database } from "@/lib/database.types";

import MultiPlayerSwitch from "./MultiPlayerSwitch";

export default async function Home() {
  const hasSupabaseClientEnv = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  if (!hasSupabaseClientEnv) {
    return <MultiPlayerSwitch user={null} />;
  }

  try {
    const supabase = createServerComponentClient<Database>({
      cookies,
    });

    const {
      data: { user },
    } = await supabase.auth.getUser();

    return <MultiPlayerSwitch user={user} />;
  } catch (error) {
    console.error("Unable to resolve Supabase user context.", error);
    return <MultiPlayerSwitch user={null} />;
  }
}
