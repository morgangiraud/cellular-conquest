import "./globals.css";

import { Inter } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";

import Footer from "@/app/components/Footer";
import { debugLog } from "@/utils";
import Nav from "./components/Nav";

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
    <html lang="en">
      <body className={`${inter.className}`}>
        <Nav />

        <div className="flex items-center justify-center max-h-fit overflow-auto pb-4">
          <div className="container mx-auto max-w-xl">{children}</div>
        </div>

        <Footer />

        <Analytics />

        {/* Google tag (gtag.js) */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <Script id="google-analytics">
              {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
            `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
