module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'prettier',
    'prettier/vue',
    'plugin:cypress/recommended',
    'plugin:nuxt/recommended',
  ],
  globals: {
    cy: true,
  },
  plugins: ['cypress', 'typescript', 'github'],
  // add your custom rules here
  rules: {
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    'vue/component-tags-order': [
      'error',
      {
        order: ['template', 'style', 'script'],
      },
    ],
    '@typescript-eslint/explicit-function-return-type': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/array-type': [
      'error',
      {
        default: 'array-simple',
      },
    ],
    'github/array-foreach': 'error',
    'use-isnan': 'error',
    curly: 'error',
    'no-fallthrough': 'error',
    'no-warning-comments': 'warn',
    'comma-spacing': 'error',
    'max-statements': 'warn',
    'no-negated-condition': 'error',
  },
}
