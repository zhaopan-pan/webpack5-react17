module.exports = {
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    env: {
        browser: true,
        commonjs: true,
        es6: true
    },
    globals: {
        $: true,
        process: true,
        __dirname: true
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
            modules: true
        },
        sourceType: 'module',
        ecmaVersion: 6
    },
    plugins: ['react', '@typescript-eslint'],
    settings: {
        'import/ignore': ['node_modules'],
        react: {
            version: 'latest'
        }
    },
    rules: {
        '@typescript-eslint/no-non-null-assertion': 0,
        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/no-inferrable-types': 0, // 关闭类型推断
        '@typescript-eslint/explicit-module-boundary-types': 0,
        '@typescript-eslint/no-unused-vars': 0, // 关闭ts的never use提示
        quotes: ['error', 'single', { allowTemplateLiterals: true }], // 单引号且可以使用模板文字
        'no-console': 0,
        'no-debugger': 1,
        'no-var': 1,
        semi: ['warn', 'never'],
        'no-irregular-whitespace': 0,
        'no-trailing-spaces': 1,
        'eol-last': 0,
        'prefer-const': 1, // 声明后没有改变却没用const
        'no-unused-vars': [
            1,
            {
                vars: 'all',
                args: 'none'
            }
        ],
        'no-case-declarations': 0,
        'no-underscore-dangle': 0,
        'no-alert': 2,
        'no-lone-blocks': 0,
        'no-class-assign': 2,
        'no-cond-assign': 2,
        'no-const-assign': 2,
        'no-delete-var': 2,
        'no-dupe-keys': 2,
        'use-isnan': 2,
        'no-duplicate-case': 2,
        'no-dupe-args': 2,
        'no-empty': 2,
        'no-func-assign': 2,
        'no-invalid-this': 0,
        // 可以重载，但是对于关键字的重复声明检查取消
        'no-redeclare': 0,
        '@typescript-eslint/no-redeclare': 'off',
        'no-spaced-func': 2,
        'no-this-before-super': 0,
        'no-undef': 2,
        'no-return-assign': 0,
        'no-script-url': 2,
        'no-extra-boolean-cast': 0,
        'no-unreachable': 1,
        'comma-dangle': 2,
        'no-mixed-spaces-and-tabs': 2,
        'prefer-arrow-callback': 0,
        'arrow-parens': 0,
        'arrow-spacing': 0,
        'react/jsx-curly-newline': [0],
        'react/state-in-constructor': [0],
        'react/static-property-placement': [0],
        'react/jsx-props-no-spreading': [0],
        'jsx-a11y/control-has-associated-label': [0]
        // 'react/jsx-fragments': [0]
    }
}
