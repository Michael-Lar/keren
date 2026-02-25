import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "#080808",
        deep: "#0F0F0F",
        charcoal: "#1A1A1A",
        mid: "#333333",
        muted: "#555555",
        silver: "#8A8A8A",
        light: "#BEBEBE",
        paper: "#E8E2D9",
        "off-white": "#F5F1EB",
        accent: "#9B7B3F",
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "Georgia", "serif"],
        mono: ["var(--font-dm-mono)", "monospace"],
        body: ["var(--font-lora)", "Georgia", "serif"],
      },
      letterSpacing: {
        widest: "0.25em",
        "ultra-wide": "0.35em",
      },
    },
  },
  plugins: [],
};

export default config;
