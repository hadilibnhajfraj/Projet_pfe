"use strict";

const js = require("@eslint/js");
const globals = require("globals");
const sonarjs = require("eslint-plugin-sonarjs");
const security = require("eslint-plugin-security");
const prettier = require("eslint-config-prettier");

module.exports = [
  {
    ignores: [
      "node_modules/**",
      "coverage/**",
      "uploads/**",
      "src/migrations/**",
      "src/seeders/**",
      "scripts/**",
    ],
  },
  js.configs.recommended,
  sonarjs.configs.recommended,
  security.configs.recommended,
  prettier,
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "commonjs",
      globals: {
        ...globals.node,
      },
    },
    rules: {
      // 195 call sites across the codebase — tracked as its own cleanup
      // item, kept as a warning so CI surfaces it without failing the build.
      "no-console": "warn",
    },
  },
  {
    files: ["**/*.test.js", "setupTests.js"],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
  },
];
