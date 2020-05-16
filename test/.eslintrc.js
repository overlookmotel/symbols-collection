/* --------------------
 * symbols-collection module
 * Tests ESLint config
 * ------------------*/

'use strict';

// Exports

module.exports = {
	extends: [
		'@overlookmotel/eslint-config-jest'
	],
	rules: {
		'import/no-unresolved': ['error', {ignore: ['^symbols-collection$']}],
		'node/no-missing-require': ['error', {allowModules: ['symbols-collection']}]
	}
};
