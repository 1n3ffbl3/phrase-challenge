/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

/**
 * @type {import("eslint").Linter.Config}
 */
const config = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  overrides: [
    {
      files: [
        'cypress/e2e/**/*.{cy,spec}.{ts,tsx}'
      ],
      'extends': [
        'plugin:cypress/recommended'
      ]
    }
  ],
  ignorePatterns: [
    ".gitignore"
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  }
}

module.exports = config;