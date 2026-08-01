import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Palette "Rosso Pomodoro" — caldo e tradizionale
        tomato: {
          DEFAULT: "#DC2626", // rosso pomodoro
          light: "#F87171",
          dark: "#B91C1C",
          deep: "#7F1D1D",
        },
        gold: {
          DEFAULT: "#A16207", // oro / crosta al forno
          light: "#CA8A04",
        },
        cream: "#FDF6EF", // panna / mozzarella
        parchment: "#F6E9DA",
        espresso: "#3A1607", // testo scuro caldo
        basil: "#4D7C2F", // basilico (accento)
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        body: ["var(--font-karla)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 30px -12px rgba(58, 22, 7, 0.25)",
        card: "0 4px 20px -8px rgba(58, 22, 7, 0.18)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
