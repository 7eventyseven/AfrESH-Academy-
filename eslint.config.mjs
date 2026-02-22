import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // MVP velocity: allow gradual typing improvements.
      "@typescript-eslint/no-explicit-any": "off",
      // This rule is noisy for marketing copy; we can revisit later.
      "react/no-unescaped-entities": "off",
      // Too strict for localStorage hydration patterns used here.
      "react-hooks/set-state-in-effect": "off",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "old/**",
    "public/uploads/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
