const postcss = require('postcss');

module.exports = postcss.plugin('postcss-editor-styles', options => {
	const defaults = {
		// The selector we're working within.
		scopeTo: '.editor-styles-wrapper',

		// Increase specificity by repeating the selector.
		repeat: 1,

		remove: ['html'],

		replace: ['body'],

		ignore: [':root'],

		tags: [
			'a',
			'svg',
			'a:hover',
			'a:focus',
			'button',
			'button:hover',
			'button:focus',
			'input',
			'label',
			'select',
			'textarea',
			'form',
			'input[type="button"]',
			'input[type="submit"]',
			'input[type="reset"]',
			'[type="button"]',
			'[type="submit"]',
			'[type="reset"]'
		],

		tagSuffix:
			':not([class^="components-"]):not([class^="editor-"]):not([class^="block-"]):not([aria-owns]):not([id^="mceu_"])'
	};

	const opts = { ...defaults, ...options };

	const firstOrLastSelector = (optsArray, selectorArray) => {
		let firstSelector = selectorArray[0];
		let lastSelector = selectorArray[selectorArray.length - 1];

		var selectorIn = [];

		if (-1 !== optsArray.indexOf(firstSelector)) {
			selectorIn.push(firstSelector);
		} else if (-1 !== optsArray.indexOf(lastSelector)) {
			selectorIn.push(lastSelector);
		} else {
			return false;
		}
		return selectorIn;
	};

	return root => {
		root.walkRules(rule => {
			rule.selectors = rule.selectors.map(selector => {
				const selectArr = selector.split(' ');
				let firstSelector = selectArr[0];
				let lastSelector = selectArr[selectArr.length - 1];

				if (
					rule.parent.type === 'atrule' &&
					rule.parent.name === 'keyframes'
				) {
					return selector;
				}

				if (firstOrLastSelector(opts.remove, selectArr)) {
					return rule.remove();
				}

				if (firstOrLastSelector(opts.replace, selectArr)) {
					const hasReplaceOpt = firstOrLastSelector(
						opts.replace,
						selectArr
					);

					return selector.replace(
						RegExp(hasReplaceOpt, 'g'),
						opts.scopeTo.repeat(opts.repeat)
					);
				}

				if (firstOrLastSelector(opts.ignore, selectArr)) {
					return selector;
				}

				if (-1 != opts.tags.indexOf(lastSelector)) {
					return `${opts.scopeTo.repeat(opts.repeat)} ${selector}${
						opts.tagSuffix
					}`;
				}

				if (firstOrLastSelector([opts.scopeTo], selectArr)) {
					return selector;
				}

				// For anything else add it before the selector.
				return `${opts.scopeTo.repeat(opts.repeat)} ${selector}`;
			});
		});
	};
});
