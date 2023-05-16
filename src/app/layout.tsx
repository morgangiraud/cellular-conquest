import "./globals.css";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

import { GameContextProvider } from "@/GameContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Cellular Conquest",
  description: "Ode to the Odyssey of Evolution",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GameContextProvider>
      <html lang="en">
        <body className={inter.className}>
          {children}
          <Analytics />
        </body>
      </html>
    </GameContextProvider>
  );
}
