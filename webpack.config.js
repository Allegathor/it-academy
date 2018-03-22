import { ExtractTextPlugin } from 'extract-text-webpack-plugin';
const extractSass = new ExtractTextPlugin({
	filename: '[name].[contenthash].css'
});

const conf = {
	entry: {
		app: './app/assets/app.js',
		vendors: './app/assets/vendors.js'
	},
	output: {
		filename: '[name].js',
		path: './dist/assets/scripts'
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				use: extractSass.extract({
					use: [{
						loader: 'css-loader'
					},{
						loader: 'sass-loader'
					}],
					fallback: 'style-loader'
				})
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			}
		]
	},
	plugins: {
		extractCss
	}
}

module.exports = conf;
