import js from '@eslint/js';
import globals from 'globals';

const forbiddenHtmlMessage =
  'Forbidden by the task requirements: create elements with document.createElement.';
const forbiddenDialogMessage = 'Forbidden by the task requirements: use a modal window instead.';

export default [
  { ignores: ['dist/', 'node_modules/'] },

  js.configs.recommended,

  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
    },
    rules: {
      'no-restricted-properties': [
        'error',
        { property: 'innerHTML', message: forbiddenHtmlMessage },
        { property: 'outerHTML', message: forbiddenHtmlMessage },
        { property: 'insertAdjacentHTML', message: forbiddenHtmlMessage },
        { property: 'createContextualFragment', message: forbiddenHtmlMessage },
        { object: 'document', property: 'write', message: forbiddenHtmlMessage },
        { object: 'document', property: 'writeln', message: forbiddenHtmlMessage },
        { object: 'window', property: 'alert', message: forbiddenDialogMessage },
        { object: 'window', property: 'confirm', message: forbiddenDialogMessage },
        { object: 'window', property: 'prompt', message: forbiddenDialogMessage },
      ],
      'no-restricted-globals': [
        'error',
        { name: 'alert', message: forbiddenDialogMessage },
        { name: 'confirm', message: forbiddenDialogMessage },
        { name: 'prompt', message: forbiddenDialogMessage },
        { name: 'DOMParser', message: forbiddenHtmlMessage },
      ],
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-var': 'error',
      'prefer-const': 'error',
      eqeqeq: ['error', 'always'],
      'no-console': 'warn',
    },
  },

  {
    files: ['*.config.js'],
    languageOptions: { globals: globals.node },
  },
];
