import js from '@eslint/js';
import globals from 'globals';

const forbiddenHtmlMessage =
  'Запрещено условием задания: создавайте элементы через document.createElement.';

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
      // --- Запреты из условия задания (штраф −100) ---
      'no-restricted-properties': [
        'error',
        { property: 'innerHTML', message: forbiddenHtmlMessage },
        { property: 'outerHTML', message: forbiddenHtmlMessage },
        { property: 'insertAdjacentHTML', message: forbiddenHtmlMessage },
        { property: 'createContextualFragment', message: forbiddenHtmlMessage },
        { object: 'document', property: 'write', message: forbiddenHtmlMessage },
        { object: 'document', property: 'writeln', message: forbiddenHtmlMessage },
        { object: 'window', property: 'alert', message: 'alert запрещён — используйте модальное окно.' },
        { object: 'window', property: 'confirm', message: 'confirm запрещён — используйте модальное окно.' },
        { object: 'window', property: 'prompt', message: 'prompt запрещён — используйте модальное окно.' },
      ],
      'no-restricted-globals': [
        'error',
        { name: 'alert', message: 'alert запрещён — используйте модальное окно.' },
        { name: 'confirm', message: 'confirm запрещён — используйте модальное окно.' },
        { name: 'prompt', message: 'prompt запрещён — используйте модальное окно.' },
        { name: 'DOMParser', message: forbiddenHtmlMessage },
      ],

      // --- Общие правила качества кода ---
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
