import "./globals.css";
import { Inter } from "next/font/google";

import { GameContextProvider } from "@/GameContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "CeluMata",
  description: "Strategic cellular automata game for two players",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GameContextProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </GameContextProvider>
  );
}