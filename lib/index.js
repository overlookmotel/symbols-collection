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

	const namesSet = new Set();
	for (const name of names) {
		if (!isFullString(name)) throw new TypeError('names must be an array of strings');
		if (name.toUpperCase() !== name) throw new Error('symbol names must be all capitalized');
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
		if (!symbol) symbol = Symbol(`${namespace}.${name}`);

		// Add symbol to returned object
		symbols[name] = symbol;

		// Add symbol to store
		if (saveToStore) storeSymbols[name] = symbol;
	}

	// Return symbols object
	return symbols;
};
