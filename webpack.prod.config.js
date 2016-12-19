var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: path.resolve(__dirname, './src/components/list/index.js'),
  output: {
    filename: "bundle.js",
    path: __dirname + "/dist"
  },
  module: {
  	loaders: [
      {
  	  	test: /\.css$/,
  	  	loader: 'style!css?modules',
        include: /flexboxgrid/
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
        exclude: path.join(__dirname, './node_modules')
  	  }
  	]
  }
};
