/** @type {import("eslint").Linter.Config} */
const config = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
  plugins: ["@typescript-eslint"],
  extends: [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
  ],
  rules: {
    // These opinionated rules are enabled in stylistic-type-checked above.
    // Feel free to reconfigure them to your own preference.
    "@typescript-eslint/array-type": "off",
    "@typescript-eslint/consistent-type-definitions": "off",

    "@typescript-eslint/consistent-type-imports": [
      "warn",
      {
        prefer: "type-imports",
        fixStyle: "inline-type-imports",
      },
    ],
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/no-misused-promises": [
      2,
      {
        checksVoidReturn: { attributes: false },
      },
    ],

    "import/order": [
      "error",
      {
        groups: [
          ["builtin", "external"],
          ["internal", "parent", "sibling"],
          ["index", "object"],
          "unknown",
          "type",
        ],

        pathGroups: [
          { pattern: "react", group: "builtin", position: "before" },
          { pattern: "next", group: "builtin" },
          // { pattern: " assets/**", group: "type", position: "after" },
          { pattern: "components/**", group: "internal", position: "after" },

          {
            pattern: "{.,..}/**/*.+(css|sass|less|scss)",
            group: "type",
            position: "after",
          },

          {
            pattern: "**/*.+(css|sass|less|scss)",
            patternOptions: { dot: true, nocomment: true },
            group: "type",
            position: "after",
          },
          { pattern: "lucide-react", group: "type", position: "after" },
        ],

        alphabetize: { order: "ignore" }, //ignore asc desc
        "newlines-between": "ignore", //ignore always
        pathGroupsExcludedImportTypes: ["builtin", "internal"],
      },
    ],
  },
};

module.exports = config;
