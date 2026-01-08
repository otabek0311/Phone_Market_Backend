import tseslint from 'typescript-eslint';
import js from '@eslint/js';

export default tseslint.config(
  {
    ignores: ['**/*.d.ts', 'dist', 'node_modules'],
  },
  {
    files: ['**/*.js', '**/*.ts'],
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:@typescript-eslint/strict',
      'plugin:@typescript-eslint/stylistic',
    ],
    rules: {
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
    },
  },
);
