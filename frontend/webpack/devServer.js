import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from './devServer.config.js';

const compiler = webpack(webpackConfig);

const config = {
  noInfo: true,
  quiet: false,
  hot: true,
  inline: true,
  lazy: false,
  stats: { colors: true },
  headers: { 'Access-Control-Allow-Origin': '*' },
  publicPath: webpackConfig.output.publicPath
};

export default [
  webpackDevMiddleware(compiler, config),
  webpackHotMiddleware(compiler)
]
