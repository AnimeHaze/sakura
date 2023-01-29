module.exports = {
  extends: [
    'plugin:vue/vue3-recommended',
    'standard',
    'plugin:security/recommended'
  ],
  plugins: [
    'unicorn',
    'no-secrets'
  ],
  rules: {
    'unicorn/prevent-abbreviations': 1,
    'unicorn/prefer-top-level-await': 1,
    'unicorn/prefer-ternary': 1,
    'unicorn/prefer-spread': 1,
    'unicorn/prefer-query-selector': 1,
    'unicorn/prefer-node-protocol': 1,
    'unicorn/prefer-logical-operator-over-ternary': 1,
    'unicorn/prefer-date-now': 1,
    'unicorn/no-unreadable-iife': 1,
    'unicorn/no-new-array': 1,
    'unicorn/no-new-buffer': 1,
    'unicorn/no-lonely-if': 1,
    'unicorn/no-nested-ternary': 1,
    'unicorn/no-console-spaces': 1,
    'unicorn/error-message': 1,
    'unicorn/consistent-destructuring': 1,
    'unicorn/catch-error-name': 1,
    'no-secrets/no-secrets': 0 // TODO: enable
  }
}
