import { resolve } from 'path';
import { optimize, NoErrorsPlugin, DefinePlugin } from 'webpack';
import combine from 'webpack-combine-loaders';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import base, { preLoaders, loaders, plugins } from './base.config';

export default {
  ...base,
  devtool: 'source-map',
  entry: {
    main: resolve('src', 'index.js')
  },
  module: {
    preLoaders,
    loaders: [
      ...loaders,
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract(
          'style',
          combine([
            {
              loader: 'css',
              query: {
                modules: true,
                sourceMap: true,
                importLoaders: 1
              }
            },
            {
              loader: 'postcss'
            }
          ]))
      }
    ],
    noParse: /node_modules\/localforage/
  },
  plugins: [
    ...plugins,
    new optimize.OccurenceOrderPlugin(),
    new optimize.UglifyJsPlugin({
      compress: { warnings: false },
      sourceMap: true,
      mangle: true,
      minimize: true
    }),
    new ExtractTextPlugin('dist/[name]/[chunkhash].css', { allChunks: true }),
    new HtmlWebpackPlugin({
      filename: '../templates/index.html',
      template: 'src/index.html',
      inject: false
    })
  ]
}
