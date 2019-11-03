/* --------------------
 * symbols-collection module
 * Tests
 * ------------------*/

'use strict';

// Modules
const symbolsCollection = require('../index');

// Tests

it('exports a function', () => {
	expect(symbolsCollection).toBeFunction();
});

it('returns an object', () => {
	const symbols = symbolsCollection('foo', ['BAR']);
	expect(symbols).toBeObject();
});

it('creates named keys', () => {
	const symbols = symbolsCollection('foo', ['BAR', 'QUX']);
	expect(symbols).toContainAllKeys(['BAR', 'QUX']);
});

it('creates symbols', () => {
	const symbols = symbolsCollection('foo', ['BAR']);
	expect(typeof symbols.BAR).toBe('symbol');
});

it('symbols named with namespace', () => {
	const symbols = symbolsCollection('foo', ['BAR']);
	expect(String(symbols.BAR)).toBe('Symbol(foo.BAR)');
});
