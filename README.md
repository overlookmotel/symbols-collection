[![NPM version](https://img.shields.io/npm/v/symbols-collection.svg)](https://www.npmjs.com/package/symbols-collection)
[![Build Status](https://img.shields.io/travis/overlookmotel/symbols-collection/master.svg)](http://travis-ci.org/overlookmotel/symbols-collection)
[![Dependency Status](https://img.shields.io/david/overlookmotel/symbols-collection.svg)](https://david-dm.org/overlookmotel/symbols-collection)
[![Dev dependency Status](https://img.shields.io/david/dev/overlookmotel/symbols-collection.svg)](https://david-dm.org/overlookmotel/symbols-collection)
[![Greenkeeper badge](https://badges.greenkeeper.io/overlookmotel/symbols-collection.svg)](https://greenkeeper.io/)
[![Coverage Status](https://img.shields.io/coveralls/overlookmotel/symbols-collection/master.svg)](https://coveralls.io/r/overlookmotel/symbols-collection)

# Create a collection of symbols with namespaced names

## Usage

Create a collection of Symbols named with common namespace.

### Basic usage

Create Symbols with a namespace in the Symbol descriptions. The descriptions are helpful in debugging.

```js
const makeSymbols = require('symbols-collection');

const symbols = makeSymbols(
  'my-module',
  ['FOO', 'BAR', 'QUX']
);
```

...is just a shortcut for:

```js
const symbols = {
  FOO: Symbol('my-module.FOO'),
  BAR: Symbol('my-module.BAR'),
  QUX: Symbol('my-module.QUX')
};
```

### Symbol store

You can cache all Symbols by passing a `store` option. `store` should be a plain object.

Symbols are saved in the store as `store[namespace][name]`.

```js
const store = {};
const symbols = makeSymbols( 'my-module', ['FOO'], { store } );

const { FOO } = symbols;
FOO // => Symbol(my-module.FOO)
store['my-module'].FOO === FOO // => true

// Somewhere else, use same store
const symbols2 = makeSymbols( 'my-module', ['FOO'], { store } );

symbols2.FOO === FOO // => true
```

#### So what's the point of a store?

The main use case is:

* You publish a module to NPM which exposes some Symbols.
* Your module may be imported in various places in an app's dependency tree.
* Different *versions* of the module may be imported (e.g. 1.0.0, 1.2.0).
* Regardless of what version is imported, the Symbols it exports needs to be the same.

Without using a store, each version will export different Symbols (with the same name), which may cause bugs.

So you need to store the Symbols globally.

`Symbol.for()` would work, but it makes the Symbols *completely* global. There's a risk of conflict with other code you don't control which might call `Symbol.for()` with the same name.

The solution:

1. Publish an NPM module which exports an empty object to act as the store, and nothing else.
2. Never update this store module, so its export never changes.
3. Wherever you define Symbols in your module, import the store module and pass it to `makeSymbols()` with the `store` option.

```js
// Publish to NPM as do-stuff-symbols-store.
// Publish once and never update.
module.exports = {};
```

```js
// Publish to NPM as do-stuff
const store = require('do-stuff-symbols-store');

const { FOO } = makeSymbols(
  'do-stuff',
  ['FOO'],
  { store }
);

function doStuff() { /* ... */ }
doStuff.FOO = FOO;

module.exports = doStuff;
```

```js
// User code
const doStuff = require('do-stuff');
doStuff.FOO // => Symbol(do-stuff.FOO)
```

`doStuff.FOO` will always be the exact same Symbol, no matter what version of the 'do-stuff' module is imported.

## Tests

Use `npm test` to run the tests. Use `npm run cover` to check coverage.

## Changelog

See [changelog.md](https://github.com/overlookmotel/symbols-collection/blob/master/changelog.md)

## Issues

If you discover a bug, please raise an issue on Github. https://github.com/overlookmotel/symbols-collection/issues

## Contribution

Pull requests are very welcome. Please:

* ensure all tests pass before submitting PR
* add tests for new features
* document new functionality/API additions in README
* do not add an entry to Changelog (Changelog is created when cutting releases)
