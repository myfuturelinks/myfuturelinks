import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  "#fff8db",
          100: "#feefb3",
          200: "#fde47a",
          300: "#fcda4a",
          400: "#f7cf15",
          500: "#F5D042", // primary yellow
          600: "#c3a71c",
        },
        ink: "#0A174E",   // primary text color
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
      },
    },
  },
  plugins: [],
};
export default config;
