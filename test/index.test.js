/* --------------------
 * symbols-collection module
 * Tests
 * ------------------*/

'use strict';

// Modules
const makeSymbols = require('symbols-collection');

// Tests

it('exports a function', () => {
	expect(makeSymbols).toBeFunction();
});

describe('with namespace', () => {
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

	it('symbol description is namespace and name', () => {
		const symbols = makeSymbols('foo', ['BAR']);
		expect(String(symbols.BAR)).toBe('Symbol(foo.BAR)');
	});
});

describe('without namespace', () => {
	it('returns an object', () => {
		const symbols = makeSymbols(['BAR']);
		expect(symbols).toBeObject();
	});

	it('creates named keys', () => {
		const symbols = makeSymbols(['BAR', 'QUX']);
		expect(symbols).toContainAllKeys(['BAR', 'QUX']);
	});

	it('creates symbols', () => {
		const symbols = makeSymbols(['BAR']);
		expect(typeof symbols.BAR).toBe('symbol');
	});

	it('symbol description is name', () => {
		const symbols = makeSymbols(['BAR']);
		expect(String(symbols.BAR)).toBe('Symbol(BAR)');
	});
});

describe('throws error if', () => {
	describe('namespace', () => {
		it('is not a string', () => {
			expect(() => {
				makeSymbols(123, ['BAR']);
			}).toThrowWithMessage(TypeError, 'namespace must be a string');
		});

		it('is empty string', () => {
			expect(() => {
				makeSymbols('', ['BAR']);
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

		it('contains empty string', () => {
			expect(() => {
				makeSymbols('foo', ['BAR', '']);
			}).toThrowWithMessage(Error, "'' is not a valid symbol name - must be in SNAKE_CASE and a valid JS identifier");
		});

		describe('contains invalid string', () => {
			it.each([
				'qux',
				'QUx',
				'Q.UX',
				'Q-UX',
				'1QUX'
			])('%s', (name) => {
				expect(() => {
					makeSymbols('foo', ['BAR', name]);
				}).toThrowWithMessage(Error, `'${name}' is not a valid symbol name - must be in SNAKE_CASE and a valid JS identifier`);
			});
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
