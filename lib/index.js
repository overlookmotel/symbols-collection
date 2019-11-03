/* --------------------
 * symbols-collection module
 * Entry point
 * ------------------*/

'use strict';

// Modules
const {isFullString, isArray} = require('is-it-type');

// Exports
module.exports = function makeSymbols(namespace, names) {
	// Validate input
	if (!isFullString(namespace)) throw new TypeError('namespace must be a string');
	if (!isArray(names)) throw new TypeError('names must be an array of strings');

	// Make symbols collection object
	const symbols = {};
	for (const name of names) {
		if (!isFullString(name)) throw new TypeError('names must be an array of strings');
		symbols[name] = Symbol(`${namespace}.${name}`);
	}
	return symbols;
};
