"use client";

import { createBrowserClient } from "@supabase/auth-helpers-nextjs";

import { getSupabaseConfig } from "./config";

import type { Database } from "@/lib/database.types";

let browserClient: ReturnType<typeof createBrowserClient<Database>> | undefined;

export function getSupabaseBrowserClient() {
  if (!browserClient) {
    const { supabaseUrl, supabaseAnonKey } = getSupabaseConfig();
    browserClient = createBrowserClient<Database>(supabaseUrl, supabaseAnonKey);
  }

  return browserClient;
}
