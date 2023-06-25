"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

import type { Session } from "@supabase/auth-helpers-nextjs";
import Button from "./components/Button";
import { debugLog } from "@/utils";
import { useState } from "react";

export default function LoginForm({ session }: { session: Session | null }) {
  debugLog("Rendering LoginForm");

  const router = useRouter();
  const supabase = createClientComponentClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailSignUp = async (email: string, password: string) => {
    await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin,
      },
    });

    router.refresh();
  };

  const handleEmailSignIn = async (email: string, password: string) => {
    await supabase.auth.signInWithPassword({
      email,
      password,
    });

    router.refresh();
  };

  const handleGithubSignIn = async () => {
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
    <div className="flex flex-col">
      <div className="mb-4">
        <label className="font-bold text-grey-darker block mb-2">Email</label>
        <input
          type="text"
          className="block appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="font-bold text-grey-darker block mb-2">
          Password
        </label>
        <input
          type="password"
          className="block appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow"
          placeholder="Your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="flex">
        <Button
          className="ml-4"
          variant="contained"
          onClick={() => handleEmailSignUp(email, password)}
        >
          Sign up with Email
        </Button>
        <Button
          className="ml-4"
          variant="contained"
          onClick={() => handleEmailSignIn(email, password)}
        >
          Sign in with Email
        </Button>
      </div>

      <hr className="my-4" />
      <Button className="ml-4" variant="contained" onClick={handleGithubSignIn}>
        Sign in with Github
      </Button>
    </div>
  );
}
