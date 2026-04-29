import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#07090F",
        bg2: "#0D1117",
        bg3: "#131920",
        surface: "#161D28",
        mint: "#5FFFD7",
        coral: "#FF7B6B",
        gold: "#FFD166",
        muted: "#9AA8C2",
        faint: "#3A4560",
      },
      fontFamily: {
        head: ["var(--font-syne)", "sans-serif"],
        body: ["var(--font-figtree)", "sans-serif"],
        mono: ["var(--font-dm-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
