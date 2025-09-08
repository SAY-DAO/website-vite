// eslint.config.js
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import airbnb from 'eslint-config-airbnb';
import prettierConfig from 'eslint-config-prettier';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

const compat = new FlatCompat({ baseDirectory: import.meta.url });

export default [
  // base ESLint recommended
  js.configs.recommended,

  // convert and include Airbnb + Prettier (FlatCompat handles CJS->flat)
  ...compat.config(airbnb),
  ...compat.config(prettierConfig),

  // Project-wide rules for JS/TS/JSX/TSX
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      // use the TypeScript parser so ESLint understands TS syntax
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
        // If you need rules that require type information, uncomment and point to your tsconfig
        // project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      // apply everywhere
      'max-len': ['error', { code: 140 }],
      'react/jsx-props-no-spreading': 'off',
      'react/forbid-prop-types': 'off',
      'react/require-default-props': [
        'error',
        { ignoreFunctionalComponents: true },
      ],
      'no-nested-ternary': 'off',
      'no-restricted-syntax': [
        'error',
        'ForInStatement',
        'LabeledStatement',
        'WithStatement',
      ],
      // prefer to allow devDependencies in common config/script locations
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: [
            '**/.eslintrc.{js,cjs,ts,jsx,tsx,json}',
            '**/.*rc.{js,cjs,ts,jsx,tsx,json}',
            '**/vite.config.*',
            '**/webpack.config.*',
            'scripts/**',
            'config/**',
            '**/*.{test,spec}.{js,jsx,ts,tsx}',
            '**/__tests__/**',
          ],
          optionalDependencies: false,
        },
      ],
    },
  },

  // Turn the rule off when linting config and script files themselves
  {
    files: ['eslint.config.js', 'scripts/**', 'config/**'],
    rules: {
      'import/no-extraneous-dependencies': 'off',
    },
  },
];
