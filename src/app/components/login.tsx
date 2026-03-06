import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import LoginForm from "./LoginForm";

import type { Database } from "@/lib/database.types";

export default async function Login() {
  const hasSupabaseClientEnv = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  if (!hasSupabaseClientEnv) {
    return null;
  }

  try {
    const supabase = createServerComponentClient<Database>({ cookies });

    const {
      data: { session },
    } = await supabase.auth.getSession();

    return <LoginForm session={session} />;
  } catch (error) {
    console.error("Unable to resolve Supabase session for login.", error);
    return null;
  }
}
