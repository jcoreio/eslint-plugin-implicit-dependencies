/* eslint-env node, es2018 */
const { name } = require('./package.json')
module.exports = {
  plugins: [name],
  rules: {
    [`@jcoreio/implicit-dependencies/no-implicit`]: [
      2,
      {
        dev: true,
      },
    ],
  },
}
