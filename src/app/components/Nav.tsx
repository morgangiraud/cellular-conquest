import Link from "next/link";

import AboutModal from "./AboutModal";
import Button from "./Button";
import Login from "./login";

export default function Nav() {
  return (
    <div className="flex mx-8">
      <Link href="/" className="text-2xl ml-0 mr-auto my-auto">
        <h1>Cellular conquest</h1>
      </Link>

      <div className="flex items-center justify-between">
        <Link href="/leaderboard">
          <Button variant="contained">Leaderboard</Button>
        </Link>

        <AboutModal />

        <Login />
      </div>
    </div>
  );
}
