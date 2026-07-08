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
        night: "#07060d",
        "night-800": "#0d0b17",
        "night-700": "#141126",
        "night-600": "#1c1836",
        neon: {
          pink: "#ff2e88",
          magenta: "#ff4dd8",
          cyan: "#28e0ff",
          blue: "#5b8cff",
          lime: "#b6ff2e",
          amber: "#ffb020",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Impact", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        "neon-pink": "0 0 8px #ff2e88, 0 0 24px rgba(255,46,136,0.55)",
        "neon-cyan": "0 0 8px #28e0ff, 0 0 24px rgba(40,224,255,0.5)",
        "neon-lime": "0 0 8px #b6ff2e, 0 0 22px rgba(182,255,46,0.5)",
      },
      backgroundImage: {
        "grid-glow":
          "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(255,46,136,0.18), transparent 60%), radial-gradient(ellipse 60% 50% at 90% 20%, rgba(40,224,255,0.12), transparent 60%)",
      },
      animation: {
        flicker: "flicker 4s linear infinite",
        "flicker-slow": "flicker 7s linear infinite",
        "pulse-dot": "pulseDot 1.6s ease-in-out infinite",
        marquee: "marquee 28s linear infinite",
        "fade-up": "fadeUp 0.7s ease forwards",
      },
      keyframes: {
        flicker: {
          "0%, 19%, 21%, 23%, 25%, 54%, 56%, 100%": { opacity: "1" },
          "20%, 24%, 55%": { opacity: "0.55" },
        },
        pulseDot: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.4", transform: "scale(0.8)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
