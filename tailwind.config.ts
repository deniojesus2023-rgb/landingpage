import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#05060F",
          900: "#0A0B1A",
          800: "#0F1128",
          700: "#151834",
          600: "#1C2145",
        },
        gold: {
          400: "#FFD65C",
          500: "#F5C518",
          600: "#E0AE00",
        },
        crimson: {
          500: "#FF3B47",
          600: "#E5252F",
        },
        violet: {
          500: "#7C5CFF",
        },
        cyan: {
          400: "#5EE7FF",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "serif"],
      },
      boxShadow: {
        glow: "0 0 40px rgba(245,197,24,0.35), 0 0 80px rgba(245,197,24,0.15)",
        "glow-red": "0 0 40px rgba(255,59,71,0.45), 0 0 80px rgba(255,59,71,0.2)",
        "inner-soft": "inset 0 1px 0 rgba(255,255,255,0.08)",
      },
      animation: {
        "gradient-x": "gradient-x 8s ease infinite",
        "shimmer": "shimmer 2.4s linear infinite",
        "float": "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s ease-in-out infinite",
        "aurora": "aurora 18s linear infinite",
        "marquee": "marquee 40s linear infinite",
      },
      keyframes: {
        "gradient-x": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(200%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        aurora: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
        "radial-spotlight":
          "radial-gradient(ellipse 80% 50% at 50% 40%, rgba(124,92,255,0.22), transparent 70%)",
      },
    },
  },
  plugins: [],
};

export default config;
