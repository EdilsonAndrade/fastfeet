module.exports = {
  env: {
    es6: true,
  },
  extends: ['airbnb', 'prettier', 'prettier/react'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    __DEV__
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react', 'jsx-a11y', 'import', 'prettier'

  ],
  rules: {
    "prettier/prettier": "error",
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    'import-helpers/order-imports': [
      'warn',
      {
          newlinesBetween: 'always',
          groups: [
              'module',
              '/^@shared/',
              ['parent', 'sibling', 'index'],
          ],
          alphabetize: { order: 'asc', ignoreCase: true },
      },
  ],
  },
  settings:{
    "import/resolver":{
      "babel-plugin-root-import":{
          rootPathSuffix: "src"
        }
    }
  }
};
