/**
 * @flow
 * @prettier
 */

import { it } from 'mocha'
import { expect } from 'chai'
import execa from '@jcoreio/toolchain/util/execa.cjs'
import dedent from 'dedent-js'

it(`works`, async function () {
  this.timeout(10000)
  expect(
    (
      await execa(
        'eslint',
        ['--config', 'eslint.config.test.cjs', '--no-ignore', 'fixture'],
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

    ${process.cwd()}/fixture/index.ts
       3:1  error  Module "foo" is not listed as a dependency in package.json    @jcoreio/implicit-dependencies/no-implicit
       4:1  error  Module "bar" is not listed as a dependency in package.json    @jcoreio/implicit-dependencies/no-implicit
       7:1  error  Module "qux" is not listed as a dependency in package.json    @jcoreio/implicit-dependencies/no-implicit
       9:1  error  Module "blonk" is not listed as a dependency in package.json  @jcoreio/implicit-dependencies/no-implicit
      11:1  error  Module "blark" is not listed as a dependency in package.json  @jcoreio/implicit-dependencies/no-implicit
      12:1  error  Module "@a/b" is not listed as a dependency in package.json   @jcoreio/implicit-dependencies/no-implicit
      40:1  error  Module "glarb" is not listed as a dependency in package.json  @jcoreio/implicit-dependencies/no-implicit

    ${process.cwd()}/fixture/typesNotIgnored.ts
       3:1   error  Module "foo" is not listed as a dependency in package.json    @jcoreio/implicit-dependencies/no-implicit
       4:1   error  Module "bar" is not listed as a dependency in package.json    @jcoreio/implicit-dependencies/no-implicit
       7:1   error  Module "qux" is not listed as a dependency in package.json    @jcoreio/implicit-dependencies/no-implicit
       9:1   error  Module "blonk" is not listed as a dependency in package.json  @jcoreio/implicit-dependencies/no-implicit
      11:1   error  Module "blark" is not listed as a dependency in package.json  @jcoreio/implicit-dependencies/no-implicit
      12:1   error  Module "@a/b" is not listed as a dependency in package.json   @jcoreio/implicit-dependencies/no-implicit
      36:1   error  Module "blag" is not listed as a dependency in package.json   @jcoreio/implicit-dependencies/no-implicit
      38:1   error  Module "floom" is not listed as a dependency in package.json  @jcoreio/implicit-dependencies/no-implicit
      40:1   error  Module "glarb" is not listed as a dependency in package.json  @jcoreio/implicit-dependencies/no-implicit
      43:10  error  Module "bloop" is not listed as a dependency in package.json  @jcoreio/implicit-dependencies/no-implicit

    ✖ 23 problems (23 errors, 0 warnings)
  `.trim()
  )
})
