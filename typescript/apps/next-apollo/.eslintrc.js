module.exports = {
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:typescript-sort-keys/recommended',
  ],
  ignorePatterns: [
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
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/prefer-interface': 'off',
    'comma-spacing': 'error',
    'no-return-await': 2,
    'no-unused-vars': 'off',
    'no-warning-comments': 'warn',
    'object-curly-spacing': ['error', 'always'],
    quotes: ['error', 'single', { avoidEscape: true }],
    'react/jsx-filename-extension': ['error', { extensions: ['ts', '.tsx'] }],
    'react/prefer-stateless-function': 2,
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    semi: ['error', 'never', { beforeStatementContinuationChars: 'never' }],
    'sort-keys': 2,
    'spaced-comment': ['error', 'always', { markers: ['/ <reference'] }],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
}
