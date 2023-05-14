/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        "cell-a": "var(--cell-a)", // blue color for player a
        "cell-b": "var(--cell-b)", // red color for player b
        "cell-empty": "var(--cell-empty)", // white color for empty cells
        "cell-fortress": "var(--cell-fortress)", // grey color for fortress cells
      },
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
  safelist: [
    {
      pattern: /bg-cell-(a|b|empty|fortress)/,
    },
  ],
};
