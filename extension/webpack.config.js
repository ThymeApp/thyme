const path = require('path');
const webpack = require('webpack'); // eslint-disable-line
const getEnv = require('react-scripts/config/env');

const env = getEnv();

const base = {
  mode: 'production',
  resolve: {
    modules: ['node_modules', '../src'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: [/\.eot$/, /\.ttf$/, /\.svg$/, /\.woff$/, /\.woff2$/],
        loader: require.resolve('file-loader'),
        options: {
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: require.resolve('url-loader'),
        options: {
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin(env.stringified),
  ],
};

module.exports = [{
  ...base,
  context: path.resolve(__dirname, './chrome'),
  entry: {
    main: './src/main.js',
    background: './src/background.js',
  },
  output: {
    path: path.resolve(__dirname, './chrome/dist'),
    publicPath: './dist/',
  },
}, {
  ...base,
  context: path.resolve(__dirname, './firefox'),
  entry: {
    main: './src/main.js',
    content: './src/content.js',
    background: './src/background.js',
  },
  output: {
    path: path.resolve(__dirname, './firefox/dist'),
    publicPath: './dist/',
  },
}];
