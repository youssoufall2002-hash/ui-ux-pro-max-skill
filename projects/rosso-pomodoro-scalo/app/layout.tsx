import type { Metadata } from "next";
import { Playfair_Display, Karla } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-playfair",
  display: "swap",
});

const karla = Karla({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-karla",
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
    <html lang="it" className={`${playfair.variable} ${karla.variable}`}>
      <body className="font-body antialiased">
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
