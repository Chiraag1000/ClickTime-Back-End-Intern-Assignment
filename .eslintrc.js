const LOG_LEVEL = Object.freeze({ OFF: 0, WARNING: 1, ERROR: 2 });

module.exports = {
	extends: ['@clicktime'],
	parserOptions: {
		project: './tsconfig.json',
		tsconfigRootDir: './',
	},
	rules: {
		'react/react-in-jsx-scope': LOG_LEVEL.OFF,
		'import/no-unresolved': [
			LOG_LEVEL.ERROR,
			{
				ignore: [
					'@components',
					'@components-js',
					'@pages',
					'@server',
					'@styles',
					'@utilities',
					'@utilities-js',
				],
			},
		],
	},
	overrides: [
		{
			files: ['src/pages/**/*.tsx', 'src/pages/**/*.jsx', 'src/pages/**/*.ts'],
			rules: {
				'import/no-default-export': LOG_LEVEL.OFF,
			},
		},
	],
};
