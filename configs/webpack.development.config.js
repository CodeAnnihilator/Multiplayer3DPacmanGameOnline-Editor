import path from 'path'
import webpack from 'webpack'

import webpackBaseConfig from './webpack.base.config'
import { SRC } from './paths'

export default {
  devtool: 'inline-source-map',
  entry: [
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:3000',
    `${SRC}/index.js`
  ],
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({ 'process.env': { 'NODE_ENV': JSON.stringify('development') } }),
    ...webpackBaseConfig.plugins
  ],
  resolve: webpackBaseConfig.resolve,
  module: {
		rules: [ ...webpackBaseConfig.module.rules ]
	},
  output: {
    path: path.resolve(__dirname, 'dist'),
		publicPath: '/dist/',
		filename: 'bundle.js'
	}
}
