import eslint from '@antfu/eslint-config'

export default eslint({
  rules: {
    // 'vue/block-order': ['error', { order: ['template', 'script', 'style'] }],
    'vue/max-attributes-per-line': ['error', { singleline: 3, multiline: 1 }],
    'jsdoc/check-param-names': 'off',
  },
  ignores: ['**/vue-global-types.d.ts'],
  vue: {
    overrides: {},
  },
})
