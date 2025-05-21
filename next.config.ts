import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	devIndicators: false,
	async redirects() {
		return [
			{
				source: "/:sec(faculty|organization|dormitory)/:entity/:build",
				destination: "/monitor?sec=:sec&entity=:entity&build=:build",
				permanent: true,
			},
			{
				source: "/:sec(faculty|organization|dormitory)/:entity",
				destination: "/monitor?sec=:sec&entity=:entity",
				permanent: true,
			},
			{
				source: "/:sec(faculty|organization|dormitory)",
				destination: "/monitor?sec=:sec",
				permanent: true,
			},
		];
	},
	async rewrites() {
		return [
			{
				source: "/monitor",
				has: [
					{
						type: "query",
						key: "sec",
					},
					{
						type: "query",
						key: "entity",
					},
					{
						type: "query",
						key: "build",
					},
				],
				destination: "/:sec/:entity/:build",
			},
			{
				source: "/monitor",
				has: [
					{
						type: "query",
						key: "sec",
					},
					{
						type: "query",
						key: "entity",
					},
				],
				destination: "/:sec/:entity",
			},
			{
				source: "/monitor",
				has: [
					{
						type: "query",
						key: "sec",
					},
				],
				destination: "/:sec",
			},
		];
	},
};

export default nextConfig;
