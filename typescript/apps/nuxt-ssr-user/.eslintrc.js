module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
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
  plugins: ['cypress'],
  // add your custom rules here
  rules: {},
}
