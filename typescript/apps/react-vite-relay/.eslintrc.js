module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["prettier", "react", "@typescript-eslint", "graphql"],
  rules: {
    "react/prop-types": 0,
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/ban-ts-comment": "warn",
    "graphql/template-strings": [
      "error",
      {
        env: "relay",
        tagName: "graphql",
        schemaString: require("fs")
          .readFileSync(require.resolve("./schema.graphql"))
          .toString(),
      },
    ],
  },
  ignorePatterns: ["node_modules", "__generated__"],
};
