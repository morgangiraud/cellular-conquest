import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypeScript from "eslint-config-next/typescript";

const config = [
  ...nextCoreWebVitals,
  ...nextTypeScript,
  {
    rules: {
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-expressions": "off",
      "import/no-anonymous-default-export": "off",
      "prefer-const": "off",
      "react-hooks/error-boundaries": "off",
      "react-hooks/set-state-in-effect": "off",
    },
  },
];

export default config;
