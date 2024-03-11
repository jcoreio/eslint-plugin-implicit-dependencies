# @jcoreio/eslint-plugin-implicit-dependencies

eslint plugin to detect implicit dependencies

Detects when a module has been 'require'd or 'import'ed that is not listed as a dependency in the project's package.json.

This helps prevent accidentally depending on a module that is present in node_modules as a result of being installed further down your dependency tree, but is not listed as an explicit dependency of your project.

## Usage

Add `@jcoreio/eslint-plugin-implicit-dependencies` to the plugins section of your [ESLint configuration file](http://eslint.org/docs/user-guide/configuring#configuration-file-formats). You can omit the `eslint-plugin-` prefix:

```yaml
plugins:
  - @jcoreio/eslint-plugin-implicit-dependencies
```

Then configure the plugin under the rules section.

```yaml
rules:
  - @jcoreio/implicit-dependencies/no-implicit: error
```

## Options

By default `implicit-dependencies` will only look for dependencies in the `dependencies` section of your package.json. You can include dev, peer and optional dependencies by configuring the rule to include those sections as follows:

```yaml
rules:
  - @jcoreio/implicit-dependencies/no-implicit:
      - error
      - dev: true
        peer: true
        optional: true
```

Or if configuring with javascript:

```javascript
rules: {
  '@jcoreio/implicit-dependencies/no-implicit': [
    'error',
    { peer: true, dev: true, optional: true }
  ]
}
```
