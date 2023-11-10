import antfu from '@antfu/eslint-config'

export default antfu(
  {
    ignores: [
      'public',
      'dist*',
    ],
  },
  {
    rules: {
      'eslint-comments/no-unlimited-disable': 'off',
      'curly': ['error', 'all'],
      'antfu/consistent-list-newline': 'off',
    },
  },
  {
    files: [
      'src/**/*.vue',
    ],
    rules: {
      'no-console': 'off',
      'vue/component-tags-order': ['error', {
        order: ['route', 'script', 'template', 'style'],
      }],
    },
  },
)
