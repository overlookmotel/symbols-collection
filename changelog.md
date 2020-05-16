# Changelog

## 2.0.1

Bug fixes:

* Better enforce symbol naming

Refactor:

* Import file extensions

Deps:

* Update `is-it-type` dependency

No code:

* Code comments on config files

Tests:

* Import module by name [refactor]
* Run tests in dev mode

Dev:

* Replace `.npmignore` with `files` list in `package.json`
* Run tests on CI on Node v14
* Update dev dependencies
* `.editorconfig` config
* ESLint process all dot files
* Remove `npm-debug.log` from `.gitignore`
* Simplify Jest config
* Simplify lint scripts

## 2.0.0

Breaking changes:

* Drop support for Node v8

Dependencies:

* Update `is-it-type` dependency

Dev:

* Remove `sudo` key from Travis CI config
* Update dev dependencies
* ESLint ignore coverage dir
* Run tests on CI on Node v13

Docs:

* Versioning policy
* Update license year

## 1.2.0

Features:

* Namespace is optional

Tests:

* Tests for errors on empty strings
* Tighten up store tests

## 1.1.2

Bug fixes:

* Return object independent of store
* Throw error if duplicate names

Dev:

* Update dev dependencies

## 1.1.1

Dependencies:

* Update `is-it-type` dependency

Dev:

* Update ESLint config

## 1.1.0

Features:

* Symbol stores support

Bug fixes:

* Ensure symbol names all caps

Tests:

* Tests for invalid input errors
* Rename import `makeSymbols` [refactor]

Dependencies:

* Update `is-it-type` dependency

Dev:

* Update dev dependencies

Docs:

* Uppercase 'Symbols' in module description [fix]

## 1.0.0

Initial release
