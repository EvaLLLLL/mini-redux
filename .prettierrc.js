module.exports = {
	singleQuote: true,
	trailingComma: 'all',
	printWidth: 80,
	semi: false,
	arrowParens: 'avoid',
	overrides: [
		{
			files: '.prettierrc',
			options: { parser: 'json' },
		},
	],
}
