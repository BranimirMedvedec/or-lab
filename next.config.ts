const withMDX = require("@next/mdx")()

/** @type {import('next').NextConfig} */
const nextConfig = {
	pageExtensions: ["js", "jsx", "ts", "tsx", "mdx"],
	// output: "standalone",
	// experimental: {
	// 	serverActions: {
	// 		allowedOrigins: ["localhost:3000"],
	// 		allowedForwardedHosts: ["localhost"],
	// 	},
	// },
}

module.exports = withMDX(nextConfig)
