import { resolve } from 'path';
import { HotModuleReplacementPlugin } from 'webpack';
import combine from 'webpack-combine-loaders';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import base, { preLoaders, loaders, plugins } from './base.config';

export default {
  ...base,
  devtool: 'inline-source-map',
  entry: {
    main: [
      'webpack-hot-middleware/client',
      resolve('src', 'index.js')
    ]
  },
  module: {
    preLoaders,
    loaders: [
      ...loaders,
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: combine([
          {
            loader: 'style'
          },
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
        ])
      }
    ],
    noParse: /node_modules\/localforage/
  },
  plugins: [
    ...plugins,
    new HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
      inject: false
    })
  ]
}
