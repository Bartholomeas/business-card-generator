/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./env.mjs");

/** @type {import("next").NextConfig} */
const config = {
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: "https",
  //       hostname: "uploadthing-prod.s3.us-west-2.amazonaws.com**",
  //     },
  //   ],
  // },
  output: "standalone",
  experimental: {
    serverActions: true,
  },
};

export default config;
