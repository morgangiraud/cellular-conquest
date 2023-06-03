"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

import type { Session } from "@supabase/auth-helpers-nextjs";
import Button from "./components/Button";

export default function LoginForm({ session }: { session: Session | null }) {
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: window.location.origin,
      },
    });

    router.refresh();
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  // for the `session` to be available on first SSR render, it must be
  // fetched in a Server Component and passed down as a prop
  return session ? (
    <Button className="ml-4" variant="contained" onClick={handleSignOut}>
      Sign out
    </Button>
  ) : (
    <Button className="ml-4" variant="contained" onClick={handleSignIn}>
      Sign in with Github
    </Button>
  );
}
