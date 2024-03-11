/**
 * @flow
 * @prettier
 */

import { it } from 'mocha'
import { expect } from 'chai'
import execa from '@jcoreio/toolchain/util/execa.cjs'
import dedent from 'dedent-js'

it(`works`, async function () {
  expect(
    (
      await execa(
        'eslint',
        ['--config', '.eslintrc-test.cjs', '--no-ignore', 'fixture'],
        { stdio: 'pipe', encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 }
      ).catch((e) => e)
    ).stdout.trim()
  ).to.equal(
    dedent`
    ${process.cwd()}/fixture/index.js
      3:1  error  Module "foo" is not listed as a dependency in package.json    @jcoreio/implicit-dependencies/no-implicit
      4:1  error  Module "bar" is not listed as a dependency in package.json    @jcoreio/implicit-dependencies/no-implicit
      6:1  error  Module "qux" is not listed as a dependency in package.json    @jcoreio/implicit-dependencies/no-implicit
      7:1  error  Module "blonk" is not listed as a dependency in package.json  @jcoreio/implicit-dependencies/no-implicit
      8:1  error  Module "blark" is not listed as a dependency in package.json  @jcoreio/implicit-dependencies/no-implicit
      9:1  error  Module "@a/b" is not listed as a dependency in package.json   @jcoreio/implicit-dependencies/no-implicit

    ✖ 6 problems (6 errors, 0 warnings)
  `.trim()
  )
})
