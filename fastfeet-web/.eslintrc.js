module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'prettier'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'prettier'
  ],
  settings:{
    'import/resolver':{
      "babel-plugin-root-import":{
        rootPathSuffix: "src"
      }
    }
  },
  rules: {
    "class-methods-use-this": "off",
    "no-param-reassign":"off",
    "camelcase":"off" ,
    "no-unused-vars": ["error", { "argsIgnorePattern": "next"}],
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "prettier/prettier":"error",
    "quotes":['error', 'single'],
    "react/jsx-props-no-spreading": "off",
    "jsx-a11y/control-has-associated-label": ["off"],
    "jsx-a11y/label-has-associated-control": ["off"],
    "react/forbid-prop-types": ["off"],
    "react-hooks/exhaustive-deps": "warn",
    "no-alert": ["off"]

  },
};
