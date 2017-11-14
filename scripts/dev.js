import path from 'path'
import open from 'open'
import webpack from 'webpack'
import { SRC } from '../configs/paths'

import WebpackDevServer from 'webpack-dev-server'
import config from '../configs/webpack.development.config.js'

const compiler = webpack(config)

const server = new WebpackDevServer(compiler, {
	hot: true,
	filename: config.output.filename,
	publicPath: config.output.publicPath,
	contentBase: SRC
})

server.listen(3000, 'localhost', function() {
  open('http://localhost:3000')
})
