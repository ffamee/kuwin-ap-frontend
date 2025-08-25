import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	devIndicators: {},
	images: {
		remotePatterns: [
			{
				protocol: "http",
				hostname: "localhost",
				port: "3001",
				pathname: "/uploads/**",
			},
		],
	},
};

export default nextConfig;
