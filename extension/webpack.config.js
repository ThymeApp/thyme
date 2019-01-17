const path = require('path');

module.exports = [{
  mode: 'development',
  context: path.resolve(__dirname, './chrome'),
  entry: {
    main: './src/main.js',
    background: './src/background.js',
  },
  output: {
    path: path.resolve(__dirname, './chrome/dist'),
  },
}];
