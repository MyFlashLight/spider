const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';
function getExternals() {
	const nodeModules = fs.readdirSync(path.join(process.cwd(), 'node_modules'));
	return nodeModules.reduce(function(ext, mod) {
		ext[mod] = 'commonjs ' + mod;
		return ext;
	}, {});
}
module.exports = {
	target: 'node',
	mode: 'development',
	devtool: 'eval-source-map',
	devServer: {
		contentBase: path.resolve(__dirname, 'dist'),
		compress: true,
		hot: true,
		hotOnly: true,
		port: 3000,
		inline: true,
		open: true
	},
	externals: getExternals(),
	module: {
		rules: [
			{
				test: /\.js$/,
				include: [ path.resolve(__dirname, 'src') ],
				exclude: path.resolve(__dirname, 'node_modules'),
				loader: 'babel-loader'
				//options: {
				//  presets: ['@babel/preset-react'],
				//  plugins: ['@babel/plugin-proposal-class-properties']
				//}
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin([ 'dist' ])
		//new webpack.HotModuleReplacementPlugin()
	]
};
