/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	compiler: {
		removeConsole: process.env.NODE_ENV === 'production', // remove all console.*
		swcMinify: true // minify the bundle
	},
	exclude: ['node_modules'],
	images: {
		minimumCacheTTL: 60 * 10,
		domains: [
			'via.placeholder.com',
			'arttoo.r2.cloudflarestorage.com',
			'arttoo.s3.us-west-1.amazonaws.com'
		],
		deviceSizes: [660, 900, 1200, 1600, 1800]
	},
	experimental: {
		runtime: 'nodejs'
	},
	env: {
		RPC_ETHEREUM: process.env.RPC_ETHEREUM,
		RPC_AVALANCHE: process.env.RPC_AVALANCHE,
		WALLET_CONNECT_PROJECT_ID: process.env.WALLET_CONNECT_PROJECT_ID
	}
};

module.exports = nextConfig;
