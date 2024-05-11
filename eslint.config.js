import pluginJs from '@eslint/js'
import pluginPrettier from 'eslint-plugin-prettier/recommended'

export default [
  pluginJs.configs.recommended,
  pluginPrettier,
  {
    rules: {},
    languageOptions: {
      globals: {
        console: true,
        process: true,
        fetch: true
      }
    },
    // ignore files
    ignores: ['.git', '.vscode', '.idea', '.husky', 'node_modules', 'dist']
  }
]
