import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Palette "Insegna vintage napoletana"
        bottle: {
          DEFAULT: "#0E3B2E", // verde bottiglia
          dark: "#0A2C22",
          light: "#1B5140",
        },
        cream: "#F2E8CF", // crema insegna
        paper: "#F7F0DA", // carta chiara
        brick: {
          DEFAULT: "#C1352B", // rosso insegna
          dark: "#9E2A22",
        },
        mustard: {
          DEFAULT: "#E8B93A", // giallo vintage
          dark: "#C79A22",
        },
        ink: "#20180F", // testo scuro caldo
      },
      fontFamily: {
        display: ["var(--font-anton)", "Impact", "sans-serif"], // insegna condensata
        cond: ["var(--font-oswald)", "Oswald", "sans-serif"], // etichette condensate
        body: ["var(--font-fraunces)", "Georgia", "serif"], // testo old-style
      },
      boxShadow: {
        sign: "0 0 0 3px #F2E8CF, 0 0 0 6px #0E3B2E",
        card: "6px 6px 0 0 #0E3B2E",
        cardRed: "6px 6px 0 0 #C1352B",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
        ticker: "ticker 24s linear infinite",
        "spin-slow": "spin-slow 40s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
