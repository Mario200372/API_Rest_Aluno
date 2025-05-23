import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: { globals: globals.node },
    rules: {
      "no-unused-vars": "warn",
      "class-methods-use-this": "off",
      "eqeqeq": "error",
      "no-console": "off",
      "import/first": "off",
      "camelcase": "off"
    }
  },
  pluginJs.configs.recommended,
];
