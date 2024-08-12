import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
// import reactHooks from "eslint-plugin-react-hooks";
// import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config({
  extends: [
    eslintConfigPrettier,
    js.configs.recommended,
    ...tseslint.configs.strict,
    ...tseslint.configs.stylistic,
  ],
  files: ["**/*.{ts,tsx}"],
  ignores: ["dist"],
  languageOptions: {
    ecmaVersion: 2020,
    globals: globals.browser,
  },
});
