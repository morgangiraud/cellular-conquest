/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        other: "var(--other)",
        "other-light": "var(--other-light)",
        "cell-a": "var(--cell-a)",
        "territory-a": "var(--light-cell-a)",
        "cell-b": "var(--cell-b)",
        "territory-b": "var(--light-cell-b)",
        "cell-empty": "var(--cell-empty)",
        secondary: "var(--secondary)",
      },
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
  safelist: [
    {
      pattern: /bg-cell-(a|b|empty|secondary)/,
    },
    {
      pattern: /bg-territory-(a|b)/,
    },
  ],
};
