/* --------------------
 * symbols-collection module
 * Tests
 * ------------------*/

'use strict';

// Modules
const makeSymbols = require('../index');

// Tests

it('exports a function', () => {
	expect(makeSymbols).toBeFunction();
});

it('returns an object', () => {
	const symbols = makeSymbols('foo', ['BAR']);
	expect(symbols).toBeObject();
});

it('creates named keys', () => {
	const symbols = makeSymbols('foo', ['BAR', 'QUX']);
	expect(symbols).toContainAllKeys(['BAR', 'QUX']);
});

it('creates symbols', () => {
	const symbols = makeSymbols('foo', ['BAR']);
	expect(typeof symbols.BAR).toBe('symbol');
});

it('symbols named with namespace', () => {
	const symbols = makeSymbols('foo', ['BAR']);
	expect(String(symbols.BAR)).toBe('Symbol(foo.BAR)');
});

describe('throws error if', () => {
	describe('namespace', () => {
		it('not provided', () => {
			expect(() => {
				makeSymbols(null, ['BAR']);
			}).toThrowWithMessage(TypeError, 'namespace must be a string');
		});

		it('is not a string', () => {
			expect(() => {
				makeSymbols(123, ['BAR']);
			}).toThrowWithMessage(TypeError, 'namespace must be a string');
		});
	});

	describe('names', () => {
		it('not provided', () => {
			expect(() => {
				makeSymbols('foo');
			}).toThrowWithMessage(TypeError, 'names must be an array of strings');
		});

		it('not an array', () => {
			expect(() => {
				makeSymbols('foo', 123);
			}).toThrowWithMessage(TypeError, 'names must be an array of strings');
		});

		it('contains a non-string', () => {
			expect(() => {
				makeSymbols('foo', ['BAR', 123]);
			}).toThrowWithMessage(TypeError, 'names must be an array of strings');
		});

		it('contains a non-capitalized string', () => {
			expect(() => {
				makeSymbols('foo', ['BAR', 'Qux']);
			}).toThrowWithMessage(Error, 'symbol names must be all capitalized');
		});

		it('contains duplicates', () => {
			expect(() => {
				makeSymbols('foo', ['BAR', 'QUX', 'BAR']);
			}).toThrowWithMessage(Error, "symbol names must be unique - 'BAR' was duplicated");
		});
	});

	describe('options', () => {
		it('is not an object', () => {
			expect(() => {
				makeSymbols('foo', ['BAR'], 123);
			}).toThrowWithMessage(TypeError, 'options must be an object if provided');
		});
	});
});
