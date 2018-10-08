const postcss = require("postcss");

module.exports = postcss.plugin("postcss-scope-to", options => {
	const defaults = {
		// The selector we're working within.
		scopeTo: "[data-block]",
		// Increase specificity by repeating the selector.
		repeat: 1
	};

	const opts = Object.assign({}, defaults, options);

	return root => {
		root.walkRules(rule => {
			rule.selectors = rule.selectors.map(selector => {
				// Replace the selector itself if the selector is a `root` level component
				if (
					selector === "html" ||
					selector === ":root" ||
					selector === opts.scopeTo
				) {
					let topElems = new RegExp(selector, "g");
					return selector.replace(topElems, opts.scopeTo.repeat(opts.repeat));
				}

				// For anything else add it before the selector.
				return `${opts.scopeTo.repeat(opts.repeat)} ${selector}`;
			});
		});
	};
});
