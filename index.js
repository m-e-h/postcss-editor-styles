const postcss = require( 'postcss' );

module.exports = postcss.plugin( 'postcss-editor-styles', options => {
	const defaults = {

		// The selector we're working within.
		scopeTo: '.editor-styles-wrapper',

		// Increase specificity by repeating the selector.
		repeat: 1,

		remove: [ 'html' ],

		replace: [ 'body' ],

		ignore: [ ':root' ],

		tags: [
			'a',
			'button',
			'input',
			'label',
			'select',
			'textarea',
			'form',
			'[type="button"]',
			'[type="submit"]',
			'[type="reset"]'
		],

		tagSuffix:
			':not([class^="components-"]):not([class^="editor-"]):not([class^="block-"]):not([aria-owns]):not([id^="mceu_"])'
	};

	const opts = Object.assign({}, defaults, options );

	return root => {
		root.walkRules( rule => {
			rule.selectors = rule.selectors.map( selector => {
				if ( -1 !== opts.remove.indexOf( selector ) ) {
					return rule.remove();
				}

				if ( -1 !== opts.replace.indexOf( selector ) ) {
					return opts.scopeTo.repeat( opts.repeat );
				}

				if ( -1 !== opts.ignore.indexOf( selector ) ) {
					return selector;
				}

				if ( -1 != opts.tags.indexOf( selector ) ) {
					return `${opts.scopeTo.repeat( opts.repeat )} ${selector}${
						opts.tagSuffix
					}`;
				}

				if ( -1 !== selector.indexOf( opts.scopeTo ) ) {
					return opts.scopeTo.repeat( opts.repeat );
				}

				// For anything else add it before the selector.
				return `${opts.scopeTo.repeat( opts.repeat )} ${selector}`;
			});
		});
	};
});
