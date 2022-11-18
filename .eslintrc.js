module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'standard-with-typescript'
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['tsconfig.json']
  },
  plugins: [
    'react'
  ],
  rules: {
    'no-console': ['warn'],
    '@typescript-eslint/explicit-function-return-type': ['off'],
    '@typescript-eslint/no-unused-vars': ['warn'],
    '@typescript-eslint/consistent-type-assertions': ['off'],
    '@typescript-eslint/prefer-optional-chain': ['off'],
    '@typescript-eslint/strict-boolean-expressions': ['off'],
    '@typescript-eslint/naming-convention': ['off'],
    'tn/handle-callback-err': ['off'],
    '@typescript-eslint/no-useless-constructor': ['off']
  }
}
