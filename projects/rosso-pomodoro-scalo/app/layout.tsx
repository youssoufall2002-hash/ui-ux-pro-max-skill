import type { Metadata } from "next";
import { Anton, Oswald, Fraunces } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const anton = Anton({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-anton",
  display: "swap",
});

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-oswald",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${site.name} ${site.place} — Pizzeria Napoletana a Milano`,
  description: site.description,
  keywords: [
    "pizzeria Milano",
    "pizza napoletana",
    "Rosso Pomodoro",
    "Scalo Milano",
    "forno a legna",
    "prenota tavolo",
  ],
  openGraph: {
    title: `${site.name} ${site.place}`,
    description: site.description,
    type: "website",
    locale: "it_IT",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="it"
      className={`${anton.variable} ${oswald.variable} ${fraunces.variable}`}
    >
      <body className="font-body antialiased">
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
