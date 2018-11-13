const postcss = require("postcss");

module.exports = postcss.plugin("postcss-scope-to", options => {

	const defaults = {

		// The selector we're working within.
		scopeTo: ".editor-styles-wrapper",

		// Increase specificity by repeating the selector.
		repeat: 1,

		// The selector we're working within.
		avoid: "[class^= 'components-']"

	};

	// const selectorElementRE = /^[a-zA-Z]/
	const opts = Object.assign({}, defaults, options);
	const tagElems = [
		'a',
		'button',
		'input',
		'label',
		'select',
		'textarea'
	];

	return root => {
		root.walkRules(rule => {
			rule.selectors = rule.selectors.map(selector => {
				// Replace the selector itself if the selector is a `root` level component
				if (
					selector === "html" ||
					selector === ":root" ||
					selector === opts.scopeTo
				) {
					return opts.scopeTo.repeat(opts.repeat);
				}

				// if (selector === "body") {
				// 	return `${opts.scopeTo}>div`;
				// }

				if (selector.indexOf('body') !== -1) {

					return selector.replace(/body/g, `${opts.scopeTo}>div`);
				}

				if (tagElems.indexOf(selector) != -1) {
					let elSelect = new RegExp(selector, "g");
					return selector.replace(elSelect, `${opts.scopeTo.repeat(opts.repeat)} ${selector}:not(${opts.avoid})`);
				}

				// For anything else add it before the selector.
				return `${opts.scopeTo.repeat(opts.repeat)} ${selector}`;
			});
		});
	};
});
