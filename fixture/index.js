/* eslint-env commonjs */

require('foo')
import 'bar'
import 'pkg-up'
import('qux/gloob')
export * from 'blonk'
export { blark } from 'blark'
require('@a/b/c')

import 'process'
import 'fs/promises'
import 'node:process'
import '@jcoreio/toolchain'

import '@jcoreio/eslint-plugin-implicit-dependencies'

const foo = 1
export { foo }

export default foo

export class Bar {}
