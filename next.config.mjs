/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
// const withBundleAnalyzer = require("@next/bundle-analyzer")({
//   enabled: process.env.ANALYZE === "true",
// });

import withBundleAnalyzer from "@next/bundle-analyzer";
import withPwa from "next-pwa";

await import("./env.mjs");

const bundleAnalyzer = withBundleAnalyzer({
	enabled: process.env.ANALYZE === "true",
});

const withPWAConfig = withPwa({
	dest: "public",
	disable: process.env.NODE_ENV === "development",
	register: true,
	skipWaiting: true,
});

/** @type {import("next").NextConfig} */
const config = {
	images: {
		remotePatterns: [{ hostname: "s3-kwirk.s3.eu-central-1.amazonaws.com**", protocol: "https" }],
	},
	webpack: config => {
		config.externals = [...config.externals, "bcrypt", { canvas: "canvas" }];
		return config;
	},
	async headers() {
		return [
			{
				source: "/(.*)",
				headers: [
					{
						key: "X-Content-Type-Options",
						value: "nosniff",
					},
					{
						key: "X-Frame-Options",
						value: "DENY",
					},
					{
						key: "Referrer-Policy",
						value: "strict-origin-when-cross-origin",
					},
				],
			},
			{
				source: "/sw.js",
				headers: [
					{
						key: "Content-Type",
						value: "application/javascript; charset=utf-8",
					},
					{
						key: "Cache-Control",
						value: "no-cache, no-store, must-revalidate",
					},
					{
						key: "Content-Security-Policy",
						value: "default-src 'self'; script-src 'self'",
					},
				],
			},
		];
	},
};

// @ts-ignore
export default bundleAnalyzer(withPWAConfig(config));
