require('@jcoreio/toolchain-esnext/util/babelRegister.cjs')

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
          ignoreTypeOnlyImports: true,
        },
      ],
    },
  },
]
