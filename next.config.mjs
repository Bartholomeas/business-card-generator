/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
// const withBundleAnalyzer = require("@next/bundle-analyzer")({
//   enabled: process.env.ANALYZE === "true",
// });

import withBundleAnalyzer from "@next/bundle-analyzer";

await import("./env.mjs");

const bundleAnalyzer = withBundleAnalyzer({
	enabled: process.env.ANALYZE === "true",
});

/** @type {import("next").NextConfig} */
const config = {
	images: {
		remotePatterns: [{ hostname: "s3-kwirk.s3.eu-central-1.amazonaws.com**", protocol: "https" }],
	},
	webpack: config => {
		config.externals = [...config.externals, "bcrypt"];
		return config;
	},
};

export default bundleAnalyzer(config);
