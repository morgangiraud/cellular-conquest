"use client";

import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import type { Session } from "@supabase/auth-helpers-nextjs";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

import { useState } from "react";
import Button from "./Button";
import { Multi } from "../svgs/Multi";

export default function LoginForm({ session }: { session: Session | null }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const supabase = createClientComponentClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  supabase.auth.onAuthStateChange((event, session) => {
    console.log("onAuthStateChange", event, session);
    if (event == "SIGNED_IN") {
      setIsOpen(false);
      router.refresh();
      router.push("/");
    }
  });

  return session ? (
    <Button className="ml-4" variant="contained" onClick={handleSignOut}>
      Sign out
    </Button>
  ) : (
    <div className="ml-4">
      <Button
        className="mx-auto"
        variant="contained"
        onClick={() => setIsOpen(true)}
      >
        <Multi className="block sm:hidden" />{" "}
        <span className="hidden sm:block">Multiplayer!</span>
      </Button>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-md max-h-[80%] overflow-auto w-full mx-auto z-10">
            <Auth
              supabaseClient={supabase}
              magicLink={false}
              providers={["github"]}
              theme="dark"
              appearance={{
                theme: ThemeSupa,
              }}
            />
          </div>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={() => setIsOpen(false)}
          />
        </div>
      )}
    </div>
  );
}
