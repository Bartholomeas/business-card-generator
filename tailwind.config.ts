/** @type {import("tailwindcss").Config} */
module.exports = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	theme: {
		container: {
			center: true,
			padding: "1rem",
			screens: {
				lg: "1080px",
				"2xl": "1400px",
			},
		},
		extend: {
			aspectRatio: {
				cardOne: "90 / 50",
				cardTwo: "85 / 55",
			},
			colors: {
				textPrimary: "var(--text-primary)",
				textSecondary: "var(--text-secondary)",
				//
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				background: {
					DEFAULT: "var(--background)",
					300: "var(--background-300)",
					400: "var(--background-400)",
					500: "var(--background-500)",
					600: "var(--background-600)",
					700: "var(--background-700)",
					card: "var(--background-card)",
				},
				backgroundCard: "var(--background-card)",
				backgroundLight: "var(--background-light)",
				backgroundBorder: "var(--background-border)",
				foreground: {
					DEFAULT: "var(--foreground)",
					dark: "var(--foreground-dark)",
					light: "var(--foreground-light)",
					muted: "var(--foreground-muted)",
				},
				primary: {
					DEFAULT: "var(--primary-500)",
					100: "var(--primary-100)",
					200: "var(--primary-200)",
					300: "var(--primary-300)",
					400: "var(--primary-400)",
					500: "var(--primary-500)",
					600: "var(--primary-600)",
					700: "var(--primary-700)",
					800: "var(--primary-800)",
					900: "var(--primary-900)",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				card: {
					DEFAULT: "var(--card)",
					foreground: "var(--card-foreground)",
				},
				white: {
					DEFAULT: "var(--white)",
					alpha: {
						10: "var(--white-alpha-10)",
						20: "var(--white-alpha-20)",
						80: "var(--white-alpha-80)",
						90: "var(--white-alpha-90)",
					},
				},
			},
			fontSize: {
				// 1 rem = 16px
				xxxs: "0.6875rem", //11px
				xxs: "0.75rem", //12px
				xs: "0.8125rem", // 13px
				sm: "0.875rem", // 14px
				base: "0.875rem", // 14px
				md: "1rem", // 16px
				lg: "1.125rem", // 18px
				lgPlus: "1.25rem", // 20px
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			keyframes: {
				"accordion-down": {
					from: { height: 0 },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: 0 },
				},
				shimmer: {
					from: {
						backgroundPosition: "0 0",
					},
					to: {
						backgroundPosition: "-200% 0",
					},
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				shimmer: "shimmer 2s linear infinite",
			},
			backgroundImage: {
				"gradient-primary": "var(--gradient-primary)",
				"gradient-overlay": "var(--gradient-overlay)",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
};
