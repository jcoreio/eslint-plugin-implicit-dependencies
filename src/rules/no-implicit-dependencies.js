import path from 'path'
import pkgUp from 'pkg-up'
import fs from 'fs'
import { builtinModules } from 'module'
import validateNpmPackageName from 'validate-npm-package-name'
const builtin = new Set(builtinModules)

export default {
  meta: {
    schema: [
      {
        type: 'object',
        properties: {
          optional: {
            type: 'boolean',
          },
          peer: {
            type: 'boolean',
          },
          dev: {
            type: 'boolean',
          },
          ignore: {
            type: 'array',
            items: { type: 'string' },
          },
        },
        additionalProperties: false,
      },
    ],
  },
  create: (context) => {
    // find the nearest package.json
    const dir = path.dirname(context.getFilename())
    const jsonPath = pkgUp.sync({ cwd: dir })
    const pkg = JSON.parse(fs.readFileSync(jsonPath, 'utf8'))
    const checkModuleName = (name, node) => {
      let moduleName

      // ignore dynamic arguments
      if (
        !name ||
        typeof name !== 'string' ||
        name === pkg.name ||
        name[0] === '.' ||
        name[0] === '/' ||
        name[0] === '!' || // ignore webpack magic
        name.startsWith('node:')
      ) {
        return
      }

      // parse module name from scope packages and deep requires
      if (name[0] === '@') {
        moduleName = name.split('/').slice(0, 2).join('/')
      } else {
        moduleName = name.split('/')[0]
      }
      // if not a valid npm package name then skip
      if (!validateNpmPackageName(moduleName).validForNewPackages) {
        return
      }
      // if module is a node core module then skip
      if (builtin.has(moduleName)) {
        return
      }

      // check dependencies
      const opts = context.options[0] || {}

      if (opts.ignore && opts.ignore.includes(moduleName)) {
        return
      } else if (pkg.dependencies && pkg.dependencies[moduleName]) {
        return
      } else if (pkg.optionalDependencies?.[moduleName] && opts.optional) {
        return
      } else if (pkg.peerDependencies?.[moduleName] && opts.peer) {
        return
      } else if (pkg.devDependencies?.[moduleName] && opts.dev) {
        return
      } else {
        context.report({
          node,
          message: `Module "${moduleName}" is not listed as a dependency in package.json`,
        })
      }
    }
    return {
      'CallExpression:exit': (node) => {
        if (
          node.callee.type === 'Identifier' &&
          node.callee.name === 'require' &&
          node.arguments.length >= 1 &&
          node.arguments[0].type === 'Literal'
        ) {
          const name = node.arguments[0].value
          checkModuleName(name, node)
        }
      },
      'ImportExpression:exit': (node) => {
        const name = node.source.value
        checkModuleName(name, node)
      },
      'ImportDeclaration:exit': (node) => {
        const name = node.source.value
        checkModuleName(name, node)
      },
      'ExportNamedDeclaration:exit': (node) => {
        const name = node.source?.value
        checkModuleName(name, node)
      },
      'ExportAllDeclaration:exit': (node) => {
        const name = node.source?.value
        checkModuleName(name, node)
      },
    }
  },
}
