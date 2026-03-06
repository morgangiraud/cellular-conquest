import LoginForm from "./LoginForm";

import { getSupabaseServerClient } from "@/lib/supabase/server";

export default async function Login() {
  const hasSupabaseClientEnv = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );

  if (!hasSupabaseClientEnv) {
    return null;
  }

  try {
    const supabase = await getSupabaseServerClient();

    const {
      data: { session },
    } = await supabase.auth.getSession();

    return <LoginForm session={session} />;
  } catch (error) {
    console.error("Unable to resolve Supabase session for login.", error);
    return null;
  }
}
