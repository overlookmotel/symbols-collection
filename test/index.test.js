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

describe('throws error if', () => {
	describe('namespace', () => {
		it('not provided', () => {
			expect(() => {
				symbolsCollection(null, ['BAR']);
			}).toThrowWithMessage(TypeError, 'namespace must be a string');
		});

		it('is not a string', () => {
			expect(() => {
				symbolsCollection(123, ['BAR']);
			}).toThrowWithMessage(TypeError, 'namespace must be a string');
		});
	});

	describe('names', () => {
		it('not provided', () => {
			expect(() => {
				symbolsCollection('foo');
			}).toThrowWithMessage(TypeError, 'names must be an array of strings');
		});

		it('not an array', () => {
			expect(() => {
				symbolsCollection('foo', 123);
			}).toThrowWithMessage(TypeError, 'names must be an array of strings');
		});

		it('contains a non-string', () => {
			expect(() => {
				symbolsCollection('foo', ['BAR', 123]);
			}).toThrowWithMessage(TypeError, 'names must be an array of strings');
		});
	});
});
