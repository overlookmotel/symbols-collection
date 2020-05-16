/* --------------------
 * symbols-collection module
 * Entry point
 * ------------------*/

'use strict';

// Modules
const {isObject, isString, isFullString, isArray} = require('is-it-type');

// Exports

const NAME_REGEX = /^[A-Z_$][A-Z_$\d]*$/;

module.exports = function makeSymbols(namespace, names, options) {
	// Conform args
	if (isArray(namespace)) {
		options = names;
		names = namespace;
		namespace = null;
	} else {
		if (namespace != null && !isFullString(namespace)) {
			throw new TypeError('namespace must be a string');
		}
		if (!isArray(names)) throw new TypeError('names must be an array of strings');
	}

	// Validate names
	const namesSet = new Set();
	for (const name of names) {
		if (!isString(name)) throw new TypeError('names must be an array of strings');
		if (!NAME_REGEX.test(name)) {
			throw new Error(
				`'${name}' is not a valid symbol name - must be in SNAKE_CASE and a valid JS identifier`
			);
		}
		if (namesSet.has(name)) {
			throw new Error(`symbol names must be unique - '${name}' was duplicated`);
		}
		namesSet.add(name);
	}

	const symbols = {};

	let store, storeSymbols;
	if (options != null) {
		if (!isObject(options)) throw new TypeError('options must be an object if provided');

		store = options.store;
		if (store != null) {
			if (!isObject(store)) throw new TypeError('options.store must be an object if provided');
			if (!namespace) throw new Error('options.store cannot be used without namespace');

			storeSymbols = store[namespace];
			if (storeSymbols !== undefined && !isObject(storeSymbols)) {
				throw new TypeError(`options.store.${namespace} is not an object`);
			}
		}
	}

	// Init store
	if (store && !storeSymbols) {
		storeSymbols = {};
		store[namespace] = storeSymbols;
	}

	// Create and add symbols to collection
	for (const name of names) {
		// Get symbol from store
		let symbol,
			saveToStore = false;
		if (storeSymbols) {
			symbol = storeSymbols[name];
			if (!symbol) saveToStore = true;
		}

		// Create new symbol if not already in store
		if (!symbol) symbol = Symbol(namespace ? `${namespace}.${name}` : name);

		// Add symbol to returned object
		symbols[name] = symbol;

		// Add symbol to store
		if (saveToStore) storeSymbols[name] = symbol;
	}

	// Return symbols object
	return symbols;
};
