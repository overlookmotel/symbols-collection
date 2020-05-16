/* --------------------
 * symbols-collection module
 * Tests for `store` option
 * ------------------*/

'use strict';

// Modules
const makeSymbols = require('../index.js');

// Tests

describe('store option', () => {
	it('returns symbols', () => {
		const symbols = makeSymbols('foo', ['BAR', 'QUX'], {store: {}});
		expect(symbols).toBeObject();
		expect(symbols).toContainAllKeys(['BAR', 'QUX']);
		expect(typeof symbols.BAR).toBe('symbol');
		expect(String(symbols.BAR)).toBe('Symbol(foo.BAR)');
	});

	it('adds namespace to store where not exists', () => {
		const store = {};
		makeSymbols('foo', ['BAR'], {store});
		expect(store).toContainAllKeys(['foo']);
		expect(store.foo).toBeObject();
	});

	it('adds symbol to store where namespace not already existing', () => {
		const store = {};
		const symbols = makeSymbols('foo', ['BAR'], {store});
		expect(typeof store.foo.BAR).toBe('symbol');
		expect(store.foo.BAR).toBe(symbols.BAR);
	});

	it('does not overwrite existing store namespace', () => {
		const foo = {},
			store = {foo};
		makeSymbols('foo', ['BAR'], {store});
		expect(store.foo).toBe(foo);
	});

	it('adds symbol to existing store namespace', () => {
		const store = {foo: {}};
		const symbols = makeSymbols('foo', ['BAR'], {store});
		expect(typeof store.foo.BAR).toBe('symbol');
		expect(store.foo.BAR).toBe(symbols.BAR);
	});

	it('does not overwrite existing stored symbol', () => {
		const symbol = Symbol('foo.BAR'),
			store = {foo: {BAR: symbol}};
		makeSymbols('foo', ['BAR'], {store});
		expect(store.foo.BAR).toBe(symbol);
	});

	it('returns existing stored symbol', () => {
		const store = {};
		const symbols1 = makeSymbols('foo', ['BAR'], {store});
		const symbols2 = makeSymbols('foo', ['BAR'], {store});
		expect(symbols2.BAR).toBe(symbols1.BAR);
	});

	it('returns object which is not reference to store', () => {
		const store = {};
		const symbols = makeSymbols('foo', ['BAR'], {store});
		expect(symbols).toBeObject();
		expect(store.foo).toBeObject();
		expect(symbols).not.toBe(store.foo);

		symbols.QUX = 123;
		expect(store.foo.QUX).toBeUndefined();
	});

	it('does not return other existing symbols in store', () => {
		const symbol = Symbol('foo.BAR'),
			store = {foo: {BAR: symbol}};
		const symbols = makeSymbols('foo', ['QUX'], {store});
		expect(symbols).toContainAllKeys(['QUX']);
	});

	describe('throws error if', () => {
		it('namespace not provided', () => {
			expect(() => {
				makeSymbols(['BAR'], {store: {}});
			}).toThrowWithMessage(Error, 'options.store cannot be used without namespace');
		});

		it('store is not an object', () => {
			expect(() => {
				makeSymbols('foo', ['BAR'], {store: 123});
			}).toThrowWithMessage(TypeError, 'options.store must be an object if provided');
		});

		it('store entry is not an object', () => {
			expect(() => {
				makeSymbols('foo', ['BAR'], {store: {foo: 123}});
			}).toThrowWithMessage(TypeError, 'options.store.foo is not an object');
		});
	});
});
