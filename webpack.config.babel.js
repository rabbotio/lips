import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ReplacePlugin from 'replace-bundle-webpack-plugin';
import OfflinePlugin from 'offline-plugin';
import path from 'path';

const file = name => path.resolve(__dirname, name);
const ENV = process.env.NODE_ENV || 'development';

module.exports = {
	context: file('src'),
	entry: './index.js',

	output: {
		path: file('build'),
		publicPath: '/',
		filename: 'bundle.js'
	},

	resolve: {
		alias: {
			// all that's needed to make styled-jsx work:
			'react': 'preact'
		}
	},

	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel'
			}
		]
	},

	plugins: ([
		new webpack.NoErrorsPlugin(),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(ENV)
		}),
		new HtmlWebpackPlugin({
			minify: { collapseWhitespace: true }
		})
	]).concat(ENV==='production' ? [
		// strip out babel-helper invariant checks
		new ReplacePlugin([{
			// this is actually the property name https://github.com/kimhou/replace-bundle-webpack-plugin/issues/1
			partten: /throw\s+(new\s+)?[a-zA-Z]+Error\s*\(/g,
			replacement: () => 'return;('
		}]),

		new OfflinePlugin({
			relativePaths: false,
			AppCache: false,
			ServiceWorker: {
				events: true
			},
			publicPath: '/'
		})
	] : []),

	stats: { colors: true },

	node: false,

	devtool: 'source-map',

	devServer: {
		port: process.env.PORT || 8080,
		publicPath: '/',
		contentBase: './src',
		historyApiFallback: true
	}
};
