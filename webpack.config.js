var webpack = require('webpack');

module.exports = {
	entry: './src/app.js',
	output: {
		filename: 'app.js'
	},
	devtool: '#source-map',
	module: {
		loaders: [
			{ test: /\.js$/, loader: 'babel', exclude: /node_modules/ }
		]
	},
	babel: {
		presets: ['es2015'],
		plugins: ['transform-runtime']
	}
};
