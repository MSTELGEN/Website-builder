import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#14171c",
        "ink-soft": "#1d2128",
        paper: "#f3ece0",
        cream: "#faf5ea",
        ember: "#d98a4e",
        "ember-deep": "#bf6f38",
        sage: "#8fa68c",
        "sage-dark": "#6b8a68",
      },
      fontFamily: {
        display: ["Fraunces", "Georgia", "serif"],
        body: ["Hanken Grotesk", "system-ui", "sans-serif"],
      },
      fontSize: {
        "night-num": ["clamp(6rem,18vw,11rem)", { lineHeight: "0.9" }],
      },
      backgroundImage: {
        "grain": "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease forwards",
        "fade-in": "fadeIn 0.4s ease forwards",
        "check-pop": "checkPop 0.25s cubic-bezier(0.34,1.56,0.64,1) forwards",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        checkPop: {
          "0%": { transform: "scale(0.7)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
