import js from '@eslint/js'
import globals from 'globals'
import eslintPluginJest from 'eslint-plugin-jest'

export default [
    js.configs.recommended,
    eslintPluginJest.configs['flat/recommended'],
    {
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'module',
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
        rules: {
            'comma-spacing': ['error', { 'before': false, 'after': true }],
            'comma-style': ['error', 'last'],
            'func-call-spacing': ['error', 'never'],
            'key-spacing': ['error', { 'mode': 'minimum', 'beforeColon': false, 'afterColon': true }],
            'keyword-spacing': ['error', { 'before': true, 'after': true }],
            'linebreak-style': ['error', 'unix'],
            'lines-between-class-members': ['error', 'always'],
            'no-console': ['warn', { 'allow': ['warn'] }],
            'no-empty-function': 'error',
            'no-multiple-empty-lines': ['error', { 'max': 2 }],
            'no-var': 'error',
            'quotes': ['error', 'single'],
            'semi': ['error', 'never'],
            'svelte/no-at-html-tags': 'off',
            'space-before-blocks': ['error', 'always'],
            'space-before-function-paren': ['error', { 'named': 'never', 'anonymous': 'always', 'asyncArrow': 'always' }],
        },
    }
]
