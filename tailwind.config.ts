import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: "#C8A84B",
          light: "var(--gold-light)",
          dark: "#8B6914",
          muted: "var(--gold-muted)",
        },
        crimson: {
          DEFAULT: "#8B1A1A",
          light: "#B22222",
        },
        dicon: {
          bg: "var(--dicon-bg)",
          surface: "var(--dicon-surface)",
          card: "var(--dicon-card)",
          border: "var(--dicon-border)",
          text: "var(--dicon-text)",
          muted: "var(--dicon-muted)",
        },
      },
      fontFamily: {
        display: ["Playfair Display", "Georgia", "serif"],
        body: ["Cormorant Garamond", "Georgia", "serif"],
        accent: ["Bebas Neue", "Impact", "sans-serif"],
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #C8A84B, #8B6914)",
        "hero-grid": `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none'%3E%3Ccircle cx='2' cy='2' r='1.25' fill='%23C8A84B' fill-opacity='0.12'/%3E%3Ccircle cx='20' cy='20' r='1' fill='%23E8C96A' fill-opacity='0.08'/%3E%3C/svg%3E")`,
      },
    },
  },
  plugins: [],
};
export default config;
