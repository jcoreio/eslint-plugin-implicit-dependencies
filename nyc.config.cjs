/* eslint-env node, es2018 */
const base = require('@jcoreio/toolchain-mocha/nyc.config.cjs')
module.exports = {
  ...base,
  include: ['dist/**'],
  instrument: true,
  sourceMap: true,
}
