import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        ajo: {
          primary: "var(--ajo-primary)",
          "primary-foreground": "var(--ajo-primary-foreground)",
          secondary: "var(--ajo-secondary)",
          "secondary-foreground": "var(--ajo-secondary-foreground)",
          accent: "var(--ajo-accent)",
          "accent-foreground": "var(--ajo-accent-foreground)",
          success: "var(--ajo-success)",
          warning: "var(--ajo-warning)",
          error: "var(--ajo-error)",
        },
      },
    },
  },
  plugins: [],
};

export default config;