module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
  },
  plugins: ['flowtype'],
  extends: ['airbnb', 'plugin:flowtype/recommended'],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js'] }],
    'react/require-default-props': 0,
    'import/prefer-default-export': 0,
    'jsx-a11y/anchor-is-valid': ['error', {
      components: ['Link'],
      specialLink: ['to'],
      aspects: ['noHref', 'invalidHref', 'preferButton'],
    }],
  },
};
