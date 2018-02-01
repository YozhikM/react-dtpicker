module.exports = {
  env: {
    es6: true,
    browser: true,
  },
  parser: 'babel-eslint',
  extends: ['airbnb', 'prettier', 'plugin:flowtype/recommended'],
  plugins: ['import', 'flowtype', 'flowtype-errors', 'prettier', 'immutable', 'array-func'],
  rules: {
    'react/prefer-stateless-function': 0,
    'react/jsx-filename-extension': 0,
    'react/sort-comp': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'jsx-a11y/label-has-for': 0,
    'jsx-a11y/no-static-element-interactions': 0.
    'class-methods-use-this': 0,
    'no-plusplus': 0,
  },
  globals: {
    expect: true,
    it: true,
    shallow: true,
  },
};
