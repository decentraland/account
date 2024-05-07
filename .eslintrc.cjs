/* eslint-env node */
module.exports = {
  parserOptions: { project: ['./tsconfig.json'] },
  plugins: ['import', 'autofix', 'css-import-order'],
  extends: ['@dcl/eslint-config/dapps', 'plugin:css-import-order/recommended'],
  rules: {
    // TODO: Remove this rule and fix all the naming conventions issues
    '@typescript-eslint/naming-convention': 'warn',
    // TODO: Remove this rule and fix all the explicit any issues
    '@typescript-eslint/no-explicit-any': 'off',
    'autofix/no-debugger': 'error',
    'sort-imports': [
      'error',
      {
        ignoreDeclarationSort: true, // don't want to sort import lines, use eslint-plugin-import instead
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
        allowSeparatedGroups: true
      }
    ],
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          ['sibling', 'parent'], // <- Relative imports, the sibling and parent types they can be mingled together
          'index',
          'object',
          'type',
          'unknown'
        ],
        pathGroupsExcludedImportTypes: ['react', 'react-*'],
        pathGroups: [
          {
            pattern: 'react',
            group: 'builtin',
            position: 'before'
          },
          {
            pattern: 'react-*',
            group: 'builtin'
          },
          {
            pattern: 'decentraland-*',
            group: 'internal'
          }
        ],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true
        }
      }
    ]
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    }
  }
}
