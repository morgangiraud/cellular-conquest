import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import type { Database } from "@/lib/database.types";

import MultiPlayerSwitch from "./MultiPlayerSwitch";
import { debugLog } from "@/utils";

export default async function Home() {
  debugLog("Rendering Home");

  const supabase = createServerComponentClient<Database>({
    cookies,
  });

  const userResponse = await supabase.auth.getUser();
  const user = userResponse.data.user;

  return <MultiPlayerSwitch user={user} />;
}
