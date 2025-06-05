require('@jcoreio/toolchain-esnext/util/babelRegister.cjs')
const tseslint = require('typescript-eslint')

module.exports = [
  {
    files: ['fixture/**/*.js'],
    plugins: {
      '@jcoreio/implicit-dependencies': require('./src/index'),
    },
    rules: {
      '@jcoreio/implicit-dependencies/no-implicit': [
        2,
        {
          dev: true,
          ignore: ['blaz', '@ack/glom'],
        },
      ],
    },
  },
  ...tseslint.config([
    {
      ...tseslint.configs.base,
      files: ['fixture/**/*.ts'],
      plugins: {
        '@jcoreio/implicit-dependencies': require('./src/index'),
      },
      rules: {
        '@jcoreio/implicit-dependencies/no-implicit': [
          2,
          {
            dev: true,
            ignore: ['blaz', '@ack/glom'],
            ignoreTypeOnlyImports: true,
          },
        ],
      },
    },
  ]),
]
