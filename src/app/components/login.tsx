import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import LoginForm from "./LoginForm";

import type { Database } from "@/lib/database.types";
import { debugLog } from "@/utils";

export default async function Login() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return <LoginForm session={session} />;
}
