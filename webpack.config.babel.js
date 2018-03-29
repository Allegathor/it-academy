import fs from 'fs';
import path from 'path';

import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import posthtmlInclude from 'posthtml-include';
import posthtmlExtend from 'posthtml-extend';


// const extractSass = new ExtractTextPlugin('./assets/styles/[name].[contenthash].css');

const extractSass = new ExtractTextPlugin('./assets/styles/[name].css');

const createHtmlPlugins = function(templateDir) {
	const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));
	return templateFiles.map(item => {
		const parts = item.split('.');
		const name = parts[0];
		const extension = parts[1];
		return new HtmlWebpackPlugin({
			filename: `${name}.html`,
			template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
			inject: false
		})
	})
}

const POSTHTMLPLUGINS = [posthtmlInclude(), posthtmlExtend()];
const HTMLPLUGINS = createHtmlPlugins('./app/views');

const conf = {
	mode: 'development',
	devtool: 'source-map',
	entry: {
		app: './app/scripts/app.js',
		vendors: './app/scripts/vendors.js',
	},
	output: {
		filename: './assets/scripts/[name].js',
		path: __dirname + '/dist'
	},
	module: {
		rules: [
			{
				test: /\.pug$/,
				use: [{
					loader: 'html-loader'
				},{
					loader: 'pug-html-loader',
					options: {
						data: {}
					}
				}]
			},
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				use: ExtractTextPlugin.extract({
					use: [{
						loader: 'css-loader',
						options: {sourceMap: true}
					},{
						loader: 'sass-loader',
						options: {sourceMap: true}
					}]
					// fallback: 'style-loader'
				})
			},
			{
				test: /\.js$/,
				use: {
					loader: 'babel-loader'
				}
			}
		]
	},
	plugins: [
		extractSass,
		new webpack.HotModuleReplacementPlugin({

		})
	].concat(HTMLPLUGINS)
}

module.exports = conf;
