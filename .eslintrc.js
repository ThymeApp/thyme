module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    jest: true,
    webextensions: true,
  },
  plugins: ['flowtype', 'react-hooks'],
  extends: ['airbnb', 'plugin:flowtype/recommended'],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js'] }],
    'react/require-default-props': 0,
    'react/jsx-props-no-spreading': 0,
    'import/prefer-default-export': 0,
    'jsx-a11y/anchor-is-valid': ['error', {
      components: ['Link'],
      specialLink: ['to'],
      aspects: ['noHref', 'invalidHref', 'preferButton'],
    }],
    'jsx-a11y/label-has-for': 0,
    'jsx-a11y/label-has-associated-control': 0,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
      },
    },
  },
};
