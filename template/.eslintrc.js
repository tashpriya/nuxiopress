module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true
  },
  extends: [
    "plugin:vue/recommended",
    "eslint:recommended",
    "prettier/vue",
    "plugin:prettier/recommended"
  ],
  rules: {
    "vue/component-name-in-template-casing": ["error", "PascalCase"],
    "vue/html-self-closing": ["error", { "html": { "normal": "never", "void": "always"} }],
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "prettier/prettier": ["error", { "singleQuote": true, "tabWidth": 2 }]
  },
  globals: {
    $nuxt: true
  },
  parserOptions: {
    parser: "babel-eslint",
    ecmaFeatures: {
      legacyDecorators: true
    }
  }
};
