/* eslint-env node */
module.exports = {
  parserOptions: { project: ['./tsconfig.json'] },
  plugins: ['import', 'autofix', 'css-import-order'],
  extends: ['@dcl/eslint-config/dapps', 'plugin:css-import-order/recommended'],
  rules: {
    // TODO: Remove this rule and fix all the naming conventions issues
    '@typescript-eslint/naming-convention': 'off',
    // TODO: Remove this rule and fix all the explicit any issues
    '@typescript-eslint/no-explicit-any': 'off',
    // TODO: Remove this rule and fix all the unbound method issues
    '@typescript-eslint/unbound-method': 'off',
    // TODO: Remove this rule and fix all the triple slash reference issues
    '@typescript-eslint/triple-slash-reference': 'off',
    // TODO: Remove this rule and fix all the ban types issues
    '@typescript-eslint/ban-types': 'off',
    'import/default': 'off',
    // TODO: Remove these rules and fix all the export issues
    'import/group-exports': 'off',
    'import/exports-last': 'off',
    'import/no-default-export': 'off',
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
          'parent',
          'sibling', // <- Relative imports, the sibling and parent types they can be mingled together
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
        'newlines-between': 'never',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true
        }
      }
    ]
  },
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true
      },
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.js', '.jsx', '.ts', '.tsx']
    }
  }
}
