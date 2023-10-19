import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // backgroundImage: {
      //   "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      //   "gradient-conic":
      //     "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      // },
      backgroundColor: {
        dark: "#1a202c", // Background color for dark mode.
        dark_conten: "#2f3a50",
      },
      textColor: {
        dark: "#ffffff", // Text color for dark mode
      },
    },
  },
  darkMode: "class",
  plugins: [require("daisyui")],
};
export default config;
