import "./globals.css";
import { Inter } from "next/font/google";
import Script from "next/script";
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
          {/* Google tag (gtag.js) */}
          <Script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-H8CKXEGKR7"
          />
          <Script id="google-analytics">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-H8CKXEGKR7');
            `}
          </Script>
        </body>
      </html>
    </GameContextProvider>
  );
}
