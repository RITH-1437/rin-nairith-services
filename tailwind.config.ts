import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Semantic theme tokens defined via CSS variables in globals.css.
        // They switch based on the <html data-theme="dark|light"> attribute.
        // RGB-channel tokens support Tailwind's opacity modifier (/10, /40, ...).
        bg: "rgb(var(--bg) / <alpha-value>)",
        bgSoft: "rgb(var(--bg-soft) / <alpha-value>)",
        panel: "rgb(var(--panel) / <alpha-value>)",
        panelRaised: "rgb(var(--panel-raised) / <alpha-value>)",
        line: "var(--line)",
        lineStrong: "var(--line-strong)",
        fg: "rgb(var(--fg) / <alpha-value>)",
        fgMuted: "rgb(var(--fg-muted) / <alpha-value>)",
        fgFaint: "rgb(var(--fg-faint) / <alpha-value>)",
        lime: "rgb(var(--accent) / <alpha-value>)",
        limeStrong: "rgb(var(--accent-strong) / <alpha-value>)",
        green: "rgb(var(--accent-dim) / <alpha-value>)",
        greenDark: "rgb(var(--accent-dark) / <alpha-value>)",
      },
      fontFamily: {
        sans: [
          "var(--font-sans)",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
        mono: [
          "var(--font-mono)",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Consolas",
          "monospace",
        ],
      },
      animation: {
        "slow-pulse": "slowPulse 5s ease-in-out infinite",
        "fade-up": "fadeUp 0.7s ease-out both",
      },
      keyframes: {
        slowPulse: {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
