const path = require('path');

module.exports = [{
  mode: 'production',
  context: path.resolve(__dirname, './chrome'),
  entry: {
    main: './src/main.js',
    background: './src/background.js',
  },
  output: {
    path: path.resolve(__dirname, './chrome/dist'),
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
    ],
  },
}];
