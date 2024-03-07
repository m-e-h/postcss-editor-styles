const { postcssTape } = require('@csstools/postcss-tape');
const plugin = require('../index.js');

postcssTape(plugin)({
	basic: {
		message: 'supports basic usage',
		options: {
			ignore: [':root', ':where()'],
		}
	},
	remove: {
		message: 'supports remove usage'
	},
	replace: {
		message: 'supports replace usage'
	},
	ignore: {
		message: 'supports ignore usage'
	},
	tags: {
		message: 'supports tags usage'
	},
	substring: {
		message: 'supports selectors that are a substring of scopeTo',
		options: {
			scopeTo: `.component-library`,
			tags: [],
		}
	}
});
