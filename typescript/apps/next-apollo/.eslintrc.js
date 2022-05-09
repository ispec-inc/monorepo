// 'plugin:prettier/recommended',
module.exports = {
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:typescript-sort-keys/recommended',
  ],
  ignorePatterns: [
    '/__generated__/**',
    '**/*.config.js',
    '**/*.config.ts',
    '**/node_modules/*',
    '**/out/*',
    '**/.next/*',
    '**/*package.json',
  ],
  parser: '@typescript-eslint/parser',
  plugins: [
    'react',
    '@typescript-eslint',
    'eslint-plugin-import',
    'typescript-sort-keys',
  ],
  root: true,
  rules: {
    '@typescript-eslint/array-type': [
      'error',
      {
        default: 'array-simple',
      },
    ],
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/indent': ['error', 2],
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { 'varsIgnorePattern': '^_' }],
    'no-unused-vars': 'off',
    '@typescript-eslint/prefer-interface': 'off',
    'comma-spacing': 'error',
    'no-return-await': 2,
    'no-warning-comments': 'warn',
    'object-curly-spacing': ['error', 'always'],
    quotes: ['error', 'single', { avoidEscape: true }],
    'react/jsx-filename-extension': ['error', { extensions: ['ts', '.tsx'] }],
    'react/prefer-stateless-function': 2,
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    semi: ['error', 'never', { beforeStatementContinuationChars: 'never' }],
    'sort-keys': 'off',
    'spaced-comment': ['error', 'always', { markers: ['/ <reference'] }],
    'typescript-sort-keys/interface': 'off'
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
}
