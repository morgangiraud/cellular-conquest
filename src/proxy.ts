import { createServerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

import { getSupabaseConfig } from "@/lib/supabase/config";
import type { NextRequest } from "next/server";
import type { Database } from "@/lib/database.types";

export async function proxy(req: NextRequest) {
  const hasSupabaseClientEnv = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );

  if (!hasSupabaseClientEnv) {
    return NextResponse.next();
  }

  const { supabaseUrl, supabaseAnonKey } = getSupabaseConfig();
  let res = NextResponse.next({
    request: {
      headers: req.headers,
    },
  });

  const supabase = createServerClient<Database>(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return req.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => {
          req.cookies.set(name, value);
        });
        res = NextResponse.next({
          request: {
            headers: req.headers,
          },
        });
        cookiesToSet.forEach(({ name, value, options }) => {
          res.cookies.set(name, value, options);
        });
      },
    },
  });

  await supabase.auth.getUser();
  return res;
}
