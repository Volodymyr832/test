import pluginJs from '@eslint/js';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import typescriptParser from '@typescript-eslint/parser';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';

// @type {import('eslint').Linter.Config[]}
export default [
    {
        languageOptions: {
            globals: {
                // Jasmine, Jest, Mocha globals
                describe: true,
                it: true,
                expect: true,
                beforeEach: true,
                afterEach: true,
                beforeAll: true,
                afterAll: true,
                test: true
            },
            parser: typescriptParser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
                tsconfigRootDir: process.cwd(),
                createDefaultProgram: true
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

            '@typescript-eslint/explicit-module-boundary-types': 'off',
            '@typescript-eslint/no-explicit-any': 'warn',

            'unicorn/filename-case': ['error', { case: 'kebabCase' }],
            'unicorn/prefer-ternary': 'warn',
            'unicorn/prevent-abbreviations': 'off'
        }
    },

    {
        ignores: ['dist/', 'node_modules/', '*.config.js', '*.config.mjs']
    }
];
