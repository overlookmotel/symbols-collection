[![NPM version](https://img.shields.io/npm/v/symbols-collection.svg)](https://www.npmjs.com/package/symbols-collection)
[![Build Status](https://img.shields.io/travis/overlookmotel/symbols-collection/master.svg)](http://travis-ci.org/overlookmotel/symbols-collection)
[![Dependency Status](https://img.shields.io/david/overlookmotel/symbols-collection.svg)](https://david-dm.org/overlookmotel/symbols-collection)
[![Dev dependency Status](https://img.shields.io/david/dev/overlookmotel/symbols-collection.svg)](https://david-dm.org/overlookmotel/symbols-collection)
[![Greenkeeper badge](https://badges.greenkeeper.io/overlookmotel/symbols-collection.svg)](https://greenkeeper.io/)
[![Coverage Status](https://img.shields.io/coveralls/overlookmotel/symbols-collection/master.svg)](https://coveralls.io/r/overlookmotel/symbols-collection)

# Create a collection of symbols with namespaced names

## Usage

Create a collection of symbols named with common namespace. The symbol descriptions simplify debugging.

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

So then you can:

```js
const {FOO} = symbols;
const obj = { [FOO]: true };
```

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
