const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './example/app.js',
  output: {
    filename: 'bundle.js',
    path: `${__dirname}/dist`,
  },
  devServer: {
  	contentBase: './example/',
  	port: 5001,
  	hot: true,
  },
  devtool: 'source-map',
  plugins: [new HtmlWebpackPlugin({
    title: 'React Material List',
    template: path.join(__dirname, './example/index.html'),
    inject: 'body',
  })],
  module: {
  	loaders: [
	  {
	  	test: /\.css$/,
	  	loader: 'style!css?modules',
      include: /flexboxgrid/,
	  },
    {
      test: /\.css$/,
      include: path.join(__dirname, './src'),
      loader: 'style!css!postcss',
      exclude: /flexboxgrid/,
    },
	  {
	  	test: /\.js$/,
	  	loader: 'babel',
      exclude: path.join(__dirname, './node_modules'),
	  },
	  {
	  	test: /\.(png|jpg|gif|woff|woff2)$/,
	  	loader: 'url-loader?limit=8192',
	  },
	  {
	  	test: /\.woff(2)?(\?v=[0-9].[0-9].[0-9])?$/,
	  	loader: 'url-loader?mimetype=application/font-woff',
	  },
	  {
	  	test: /\.(ttf|eot|svg)(\?v=[0-9].[0-9].[0-9])?$/,
	  	loader: 'file-loader?name=[name].[ext]',
	  },
  	],
  },
};
