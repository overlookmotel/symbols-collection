/* --------------------
 * symbols-collection module
 * Tests for `store` option
 * ------------------*/

'use strict';

// Modules
const makeSymbols = require('../index');

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
		makeSymbols('foo', ['BAR'], {store});
		expect(typeof store.foo.BAR).toBe('symbol');
	});

	it('does not overwrite existing store namespace', () => {
		const foo = {},
			store = {foo};
		makeSymbols('foo', ['BAR'], {store});
		expect(store.foo).toBe(foo);
	});

	it('adds symbol to existing store namespace', () => {
		const store = {foo: {}};
		makeSymbols('foo', ['BAR'], {store});
		expect(typeof store.foo.BAR).toBe('symbol');
	});

	it('does not overwrite existing stored symbol', () => {
		const symbol = Symbol('foo.BAR'),
			store = {foo: {BAR: symbol}};
		makeSymbols('foo', ['BAR'], {store});
		expect(store.foo.BAR).toBe(symbol);
	});

	it('returns existing stored symbol', () => {
		const symbol = Symbol('foo.BAR'),
			store = {foo: {BAR: symbol}};
		const symbols = makeSymbols('foo', ['BAR'], {store});
		expect(symbols.BAR).toBe(symbol);
	});

	describe('throws error if', () => {
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
