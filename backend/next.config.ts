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
	async headers() {
		return [
			{
				source: "/api/(.*)",
				headers: [
					{
						key: "Access-Control-Allow-Credentials",
						value: "true",
					},
					{
						key: "Access-Control-Allow-Origin",
						value: "http://localhost:3000",
					},
					{
						key: "Access-Control-Allow-Methods",
						value: "GET,PATCH,DELETE,POST,PUT",
					},
					{
						key: "Access-Control-Allow-Headers",
						value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
					},
				],
			},
		]
	},
}

module.exports = withMDX(nextConfig)
