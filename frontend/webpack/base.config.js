import { resolve } from 'path';
import { NoErrorsPlugin, DefinePlugin } from 'webpack';
import autoprefixer from 'autoprefixer';

const limit = 10240;

export const preLoaders = [
  {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    loader: 'eslint'
  }
];

export const loaders = [
  {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    loader: 'babel'
  },
  {
    test: /\.json$/,
    loader: 'json'
  },
  {
    test: /\.eot(\?[a-z0-9=&.]+)?$/,
    loader: 'file'
  },
  {
    test: /\.woff2?(\?[a-z0-9=&.]+)?$/,
    loader: 'url',
    query: {
      limit,
      mimetype: 'application/font-woff'
    }
  },
  {
    test: /\.ttf(\?[a-z0-9=&.]+)?$/,
    loader: 'url',
    query: {
      limit,
      mimetype: 'application/octet-stream'
    }
  },
  {
    test: /\.svg(\?[a-z0-9=&.]+)?$/,
    loader: 'url',
    query: {
      limit,
      mimetype: 'image/svg+xml'
    }
  },
  {
    test: /\.(jpe?g|png|gif)$/,
    loader: 'url',
    query: {
      limit
    }
  }
];

export const plugins = [
  new NoErrorsPlugin(),
  new DefinePlugin({
    'process.env': {
      PROFILE: JSON.stringify(process.env.PROFILE),
      NODE_ENV: JSON.stringify(process.env.NODE_ENV)
    },
    Platform: {
      OS: JSON.stringify('browser')
    }
  })
];

export default {
  context: resolve(process.cwd()),
  output: {
    path: resolve('..', 'app', 'src', 'main', 'resources', 'static'),
    filename: 'dist/[name]/[hash].js',
    chunkFilename: 'dist/[name]/[chunkhash].js',
    publicPath: '/'
  },
  progress: true,
  postcss() {
    return [autoprefixer({ browsers: '> 0%' })];
  }
};
