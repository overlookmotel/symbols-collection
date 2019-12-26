/* --------------------
 * symbols-collection module
 * Entry point
 * ------------------*/

'use strict';

// Modules
const {isObject, isFullString, isArray} = require('is-it-type');

// Exports
module.exports = function makeSymbols(namespace, names, options) {
	// Validate input
	if (!isFullString(namespace)) throw new TypeError('namespace must be a string');
	if (!isArray(names)) throw new TypeError('names must be an array of strings');

	for (const name of names) {
		if (!isFullString(name)) throw new TypeError('names must be an array of strings');
		if (name.toUpperCase() !== name) throw new Error('symbol names must be all capitalized');
	}

	let symbols, store;
	if (options != null) {
		if (!isObject(options)) throw new TypeError('options must be an object if provided');

		store = options.store;
		if (store != null) {
			if (!isObject(store)) throw new TypeError('options.store must be an object if provided');

			symbols = store[namespace];
			if (symbols != null && !isObject(symbols)) {
				throw new TypeError(`options.store.${namespace} is not an object`);
			}
		}
	}

	// Create symbols object, and save to store
	if (!symbols) {
		symbols = {};
		if (store) store[namespace] = symbols;
	}

	// Create and add symbols to collection
	for (const name of names) {
		if (!symbols[name]) symbols[name] = Symbol(`${namespace}.${name}`);
	}

	// Return symbols object
	return symbols;
};
