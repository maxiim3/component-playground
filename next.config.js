/** @type {import("next").NextConfig} */
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin")

const nextConfig = {
	reactStrictMode: true,
	webpack: (config, {isServer}) => {
		if (!isServer) {
			config.resolve.fallback = { fs: false }
		}
		// add monaco-editor-webpack-plugin
		config.plugins.push(
			new MonacoWebpackPlugin({
										// available options are documented at https://github.com/Microsoft/monaco-editor-webpack-plugin#options
										languages: ["json", "javascript", "css", "html", "typescript"],
									}),
		)
		return config
	},

}

module.exports = nextConfig
