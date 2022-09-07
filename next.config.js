/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	webpack: (config, { isServer }) => {
		if (!isServer) {
			// don't resolve 'fs' module on the client to prevent this error on build --> Error: Can't resolve 'fs'
			config.resolve.fallback = {
				fs: false,
			};
		}

		return config;
	},
	images: {
		domains: [
			'thrangra.sirv.com',
			'www.hyperui.dev',
			'localhost:3000',
			'localhost',
		],
	},
};

module.exports = nextConfig;

// module.exports = function override(config) {
// 	const fallback = config.resolve.fallback || {};

// 	Object.assign(fallback, {
// 		crypto: require.resolve('crypto-browserify'),
// 		stream: require.resolve('stream-browserify'),
// 		assert: require.resolve('assert'),
// 		http: require.resolve('stream-http'),
// 		https: require.resolve('https-browserify'),
// 		os: require.resolve('os-browserify'),
// 		url: require.resolve('url'),
// 		path: require.resolve('path-browserify'),
// 		fs: require.resolve('fs'),
// 	});

// 	config.resolve.fallback = fallback;
// 	config.plugins = (config.plugins || []).concat([
// 		new webpack.ProvidePlugin({
// 			process: 'process/browser',
// 			Buffer: ['buffer', 'Buffer'],
// 		}),
// 	]);

// 	config.ignoreWarnings = [/Failed to parse source map/];
// 	return config;
// };
