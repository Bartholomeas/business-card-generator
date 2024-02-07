/** @type {import("eslint").Linter.Config} */
const config = {
  parserOptions: {
    parser: "@typescript-eslint/parser",
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
  },
  plugins: ["@typescript-eslint"],
  extends: [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
    "plugin:tailwindcss/recommended",
    "plugin:testing-library/react",
    "plugin:jest-dom/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:sonarjs/recommended",
  ],
  rules: {
    // These opinionated rules are enabled in stylistic-type-checked above.
    // Feel free to reconfigure them to your own preference.
    "@typescript-eslint/array-type": "warn",
    "@typescript-eslint/consistent-type-definitions": "warn",
    "@typescript-eslint/require-await": "off",
    "sonarjs/no-duplicate-string": "warn",
    "@typescript-eslint/consistent-type-imports": [
      "warn",
      {
        prefer: "type-imports",
        fixStyle: "inline-type-imports",
      },
    ],

    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
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
