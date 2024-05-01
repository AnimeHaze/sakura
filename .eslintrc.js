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
    'security/detect-object-injection': 0,
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
    'no-secrets/no-secrets': 0, // TODO: enable
    'import/no-duplicates': 1,
    'import/newline-after-import': 1,
    'import/first': 1,
    'import/no-self-import': 1,
    'import/no-absolute-path': 1,
    'import/no-deprecated': 1,
    'vue/component-api-style ': ['error',
      ['script-setup', 'composition'] // "script-setup", "composition", "composition-vue2", or "options"
    ],
    'vue/component-name-in-template-casing': ['error', 'kebab-case', {
      registeredComponentsOnly: true,
      ignores: []
    }],
    'vue/custom-event-name-casing': ['error', 'kebab-case', {
      ignores: []
    }],
    'vue/define-macros-order': ['error', {
      order: ['defineProps', 'defineEmits']
    }]
  }
}
