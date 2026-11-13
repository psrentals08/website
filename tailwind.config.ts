import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: "#F47719",
          "orange-light": "#FF8C2A",
          "orange-dark": "#D4620E",
          black: "#080808",
          charcoal: "#1A1A1A",
          "charcoal-light": "#2A2A2A",
          gray: "#6B7280",
          "gray-light": "#9CA3AF",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-rajdhani)", "system-ui", "sans-serif"],
        mono: ["var(--font-space-mono)", "monospace"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.8s ease-out forwards",
        "slide-in-right": "slideInRight 0.8s ease-out forwards",
        "pulse-orange": "pulseOrange 2s ease-in-out infinite",
        "spin-slow": "spin 8s linear infinite",
        "float": "float 3s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(40px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideInRight: {
          from: { opacity: "0", transform: "translateX(40px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        pulseOrange: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(244,119,25,0.4)" },
          "50%": { boxShadow: "0 0 40px rgba(244,119,25,0.8), 0 0 80px rgba(244,119,25,0.3)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glow: {
          from: { textShadow: "0 0 10px rgba(244,119,25,0.5)" },
          to: { textShadow: "0 0 20px rgba(244,119,25,1), 0 0 40px rgba(244,119,25,0.5)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "hero-gradient": "linear-gradient(135deg, #080808 0%, #1A1A1A 50%, #080808 100%)",
        "orange-gradient": "linear-gradient(135deg, #F47719 0%, #FF8C2A 100%)",
        "card-gradient": "linear-gradient(180deg, transparent 0%, rgba(8,8,8,0.9) 100%)",
      },
      screens: {
        xs: "475px",
      },
    },
  },
  plugins: [],
};

export default config;
