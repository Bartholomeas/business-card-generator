/** @type {import("eslint").Linter.Config} */
const config = {
	root: true,
	parser: "@typescript-eslint/parser",
	parserOptions: {
		project: "./tsconfig.json",
		tsconfigRootDir: __dirname,
		sourceType: "module",
	},
	plugins: ["@typescript-eslint", "import"],
	extends: [
		"next/core-web-vitals",
		"plugin:@typescript-eslint/recommended-type-checked",
		"plugin:@typescript-eslint/stylistic-type-checked",
		"plugin:import/typescript",
		"plugin:tailwindcss/recommended",
		"plugin:testing-library/react",
		"plugin:jest-dom/recommended",
		"plugin:jsx-a11y/recommended",
		"plugin:sonarjs/recommended",
		"eslint-config-prettier",
		"prettier",
	],
	rules: {
		// A11Y accessibility
		"jsx-a11y/alt-text": "error",
		"no-template-curly-in-string": "error",
		"no-unsafe-negation": "error",

		// TypeScript
		"@typescript-eslint/array-type": "off",
		"@typescript-eslint/consistent-type-definitions": "off",
		"@typescript-eslint/consistent-type-imports": [
			"error",
			{
				prefer: "type-imports",
				fixStyle: "inline-type-imports",
				disallowTypeAnnotations: false,
			},
		],
		"@typescript-eslint/no-empty-interface": "off",
		"@typescript-eslint/no-empty-function": "off",
		"@typescript-eslint/no-misused-promises": "off",
		"@typescript-eslint/no-unsafe-assignment": "off",
		"@typescript-eslint/no-unused-vars": "error",
		"@typescript-eslint/prefer-nullish-coalescing": "off",
		"@typescript-eslint/require-await": "off",
		"@typescript-eslint/restrict-template-expressions": [
			"error",
			{
				allowNumber: true,
				allowBoolean: true,
			},
		],
		"@typescript-eslint/return-await": ["error", "in-try-catch"],
		"@typescript-eslint/unbound-method": ["warn", { ignoreStatic: true }],

		// Import
		"import/extensions": "error",
		"import/first": "error",
		"import/newline-after-import": "error",
		"import/no-absolute-path": "error",
		"import/no-amd": "error",
		"import/no-cycle": "warn",
		"import/no-deprecated": "error",
		"import/no-duplicates": [
			"error",
			{
				"prefer-inline": true,
			},
		],
		"import/no-mutable-exports": "error",
		"import/no-named-as-default": "error",
		"import/no-named-as-default-member": "error",
		"import/no-named-default": "error",
		"import/namespace": ["off"],
		"import/order": [
			"warn",
			{
				"newlines-between": "always",
				alphabetize: {
					order: "asc",
					caseInsensitive: true,
				},
				groups: [
					"builtin",
					"external",
					"internal",
					["parent", "sibling"],
					"index",
					"object",
					"type",
				],
				pathGroups: [
					{
						pattern: "react",
						group: "builtin",
						position: "before",
					},
					{
						pattern: "next/**",
						group: "builtin",
						position: "before",
					},
					{
						pattern: "~/utils/**",
						group: "internal",
						position: "after",
					},
					{
						pattern: "~/server/api/**",
						group: "internal",
						position: "after",
					},
					{
						pattern: "~/components/**",
						group: "internal",
						position: "after",
					},
					{
						pattern: "~/types/**",
						group: "type",
						position: "after",
					},
				],
				pathGroupsExcludedImportTypes: ["react", "next"],
			},
		],

		// React
		"react/no-unescaped-entities": "off",

		// Best practices
		"array-callback-return": "error",
		"block-scoped-var": "error",
		complexity: "off",
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

		// Stylistic
		"consistent-this": ["warn", "that"],
		"func-name-matching": "error",
		"func-style": ["warn", "declaration", { allowArrowFunctions: true }],
		"lines-between-class-members": ["error", "always", { exceptAfterSingleLine: true }],
		"max-depth": "off",
		"max-lines": ["warn", 1000],
		"max-params": ["warn", 4],
		"no-array-constructor": "warn",
		"no-bitwise": "warn",
		"no-lonely-if": "error",
		"no-multi-assign": "warn",
		"no-nested-ternary": "warn",
		"no-new-object": "warn",
		"no-underscore-dangle": "off",
		"no-unneeded-ternary": "warn",
		"one-var": ["warn", "never"],
		"operator-assignment": "warn",
		"padding-line-between-statements": "error",

		// SonarJS
		"sonarjs/cognitive-complexity": "off",
		"sonarjs/no-duplicate-string": "off",

		// Tailwind
		"tailwindcss/no-custom-classname": "off",

		// Other
		"no-empty-pattern": "off",
		"no-restricted-imports": [
			"error",
			{
				name: "next/router",
				message: "Please use next/navigation instead.",
			},
		],
	},
	overrides: [
		{
			files: [
				"*.d.ts",
				"tailwind.config.ts",
				"prettier.config.js",
				"middleware.ts",
				"commitlint.config.ts",
				"vitest.config.ts",
			],
			rules: {
				"import/no-default-export": "off",
			},
		},
	],
	ignorePatterns: ["*.js", "*.jsx", "*.mjs", "src/script/**/*.ts"],
};

module.exports = config;
