'use strict'

module.exports = {

  root: true,

  parserOptions: {
    parser: 'babel-eslint'
  },

  env: {
    browser: true,
    node: true,
    'jest/globals': true
  },

  extends: [
    '@vue/standard',
    'plugin:vue/recommended',
    'plugin:jest/recommended',
    'plugin:jest/style'
  ],

  plugins: [
    'vue',
    'jest'
  ],

  rules: {
    'no-console': ['error', { allow: ['warn', 'error'] }]
  },

  globals: {
    use: true
  }
}
