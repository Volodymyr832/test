import globals from 'globals';
import pluginJs from '@eslint/js';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import typescriptParser from '@typescript-eslint/parser';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';

// @type {import('eslint').Linter.Config[]} 
export default [
    {
        languageOptions: {
            globals: globals.browser,
            parser: typescriptParser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
                project: './tsconfig.json' 
            }
        }
    },

    pluginJs.configs.recommended,

    {
        plugins: {
            unicorn: eslintPluginUnicorn,
            '@typescript-eslint': typescriptPlugin
        },
        name: 'best practices rules',
        files: ['**/*.ts', '**/*.tsx'],
        rules: {
            ...pluginJs.configs.recommended.rules,

            ...typescriptPlugin.configs.recommended.rules,

            semi: ['error', 'always'],
            indent: ['error', 4, { SwitchCase: 1 }],
            'max-len': ['warn', { code: 140, ignoreUrls: true, ignoreStrings: true, ignoreTemplateLiterals: true }],
            'brace-style': ['warn'],
            'comma-dangle': ['error', 'never'],
            'no-multiple-empty-lines': ['error', { max: 2 }],
            'no-trailing-spaces': ['error', { skipBlankLines: false }],
            'eol-last': ['error', 'always'],
            'no-var': ['error'],

            'unicorn/filename-case': ['error', { case: 'kebabCase' }],
            'unicorn/prefer-ternary': 'warn',
            'unicorn/prevent-abbreviations': 'off'
        }
    },

    {
        ignores: ['dist/', 'node_modules/', '*.config.js', '*.config.mjs']
    }
];
