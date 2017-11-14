import webpack from 'webpack'
import { SRC, NODE_MODULES } from './paths'

export default {
  resolve: {
    alias: {
      '@src': SRC
    },
    extensions: ['.js']
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin()
  ],
  module: {
    rules: [{
			test: /\.js$/,
			use: [{
        loader: 'babel-loader'
      }],
			exclude: /node_modules/
		}]
	}
}
