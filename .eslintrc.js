module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
  },
  plugins: ['flowtype'],
  extends: ['airbnb', 'plugin:flowtype/recommended'],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js'] }],
  },
};
