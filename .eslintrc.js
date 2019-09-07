module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: ['airbnb-base', 'prettier'],
  plugins: ['prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': 'error',
    'class-methods-use-this': 'off', // Nao force todos os metodos de classe a usar this
    'no-param-reassign': 'off', // Precisa que esta regra seja desativada
    camelcase: 'off',
    'no-unused-vars': ['error', { argsIgnorePattern: 'next' }], // Nao reclame se a variavel sem uso for 'next'
  },
};
