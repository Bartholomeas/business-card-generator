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
    // A11Y accesibility
    "jsx-a11y/alt-text": "error",
    //
    "no-template-curly-in-string": "error",
    "no-unsafe-negation": "error",
    // "import/no-cycle": [
    //   "error",
    //   {
    //     maxDepth: 10,
    //     ignoreExternal: true,
    //   },
    // ],

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
    "import/extensions": "error",
    "import/first": "error",
    "import/newline-after-import": "error",
    "import/no-absolute-path": "error",
    "import/no-amd": "error",
    "import/no-deprecated": "error",
    "import/no-duplicates": "error",
    "import/no-mutable-exports": "error",
    "import/no-named-as-default": "error",
    "import/no-named-as-default-member": "error",
    "import/no-named-default": "error",
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
    // es2015
    "no-duplicate-imports": "error",
    "no-useless-computed-key": "error",
    "no-useless-rename": "error",
    "no-var": "error",
    "object-shorthand": "error",
    "prefer-arrow-callback": "error",
    "prefer-const": "error",
    "prefer-destructuring": ["warn", { object: true, array: false }],
    "prefer-numeric-literals": "warn",
    "prefer-rest-params": "warn",
    "prefer-spread": "warn",
    // best practices
    "array-callback-return": "error",
    "block-scoped-var": "error",
    complexity: "error",
    "guard-for-in": "error",
    "no-alert": "error",
    "no-caller": "error",
    "no-div-regex": "error",
    "no-eval": "error",
    "no-extend-native": "error",
    "no-extra-bind": "error",
    "no-extra-label": "error",
    "no-floating-decimal": "error",
    "no-implied-eval": "error",
    "no-iterator": "error",
    "no-labels": "error",
    "no-lone-blocks": "error",
    "no-loop-func": "error",
    "no-new": "error",
    "no-new-func": "error",
    "no-new-wrappers": "error",
    "no-proto": "error",
    "no-restricted-properties": "error",
    "no-return-assign": "error",
    "no-return-await": "error",
    "no-self-compare": "error",
    "no-sequences": "error",
    "no-throw-literal": "error",
    "no-unmodified-loop-condition": "error",
    "no-unused-expressions": "error",
    "no-useless-call": "error",
    "no-useless-concat": "error",
    "no-useless-escape": "error",
    "no-useless-return": "error",
    "no-void": "error",
    "no-with": "error",

    // stylistic
    "consistent-this": ["warn", "that"],
    "func-name-matching": "error",
    "func-style": ["warn", "declaration", { allowArrowFunctions: true }],
    "lines-between-class-members": ["error", "always", { exceptAfterSingleLine: true }],
    "max-depth": "warn",
    "max-lines": ["warn", 1000],
    "max-params": ["warn", 4],
    "no-array-constructor": "warn",
    "no-bitwise": "warn",
    "no-lonely-if": "error",
    "no-multi-assign": "warn",
    "no-nested-ternary": "warn",
    "no-new-object": "warn",
    "no-underscore-dangle": "warn",
    "no-unneeded-ternary": "warn",
    "one-var": ["warn", "never"],
    "operator-assignment": "warn",
    "padding-line-between-statements": "error",

    "sonarjs/cognitive-complexity": "warn",
  },
};

module.exports = config;
