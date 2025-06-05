/* eslint-env commonjs */

require('foo')
import 'bar'
import 'pkg-up'
// @ts-expect-error missing dep
import('qux/gloob')
// @ts-expect-error missing dep
export * from 'blonk'
// @ts-expect-error missing dep
export { blark } from 'blark'
require('@a/b/c')

require('!!raw-loader!./foo/bar')
require('_a-b')
require('AB')

import 'process'
import 'fs/promises'
import 'node:process'
import '@jcoreio/toolchain'

import '@jcoreio/eslint-plugin-implicit-dependencies'

const foo = 1
export { foo }

export default foo

export class Bar {}

import 'blaz'
import '@ack/glom/flark'

// @ts-expect-error missing dep
import type {blag} from 'blag'
// @ts-expect-error missing dep
import {type floom, type flam} from 'floom'
// @ts-expect-error missing dep
import {type glarb, blorgh} from 'glarb'