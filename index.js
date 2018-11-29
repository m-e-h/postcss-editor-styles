const postcss = require('postcss')

module.exports = postcss.plugin('postcss-scope-to', options => {
  const defaults = {
        // The selector we're working within.
    scopeTo: '.editor-styles-wrapper',

        // Increase specificity by repeating the selector.
    repeat: 1,

    remove: ['html', ':hover', ':focus'],

    replace: ['body'],

    ignore: [':root'],

    tags: ['a', 'button', 'input', 'label', 'select', 'textarea', 'form']
  }

  const opts = Object.assign({}, defaults, options)

  return root => {
    root.walkRules(rule => {
      rule.selectors = rule.selectors.map(selector => {
        if (opts.remove.indexOf(selector) !== -1) {
          return rule.remove()
        }

        if (opts.replace.indexOf(selector) !== -1) {
          return opts.scopeTo.repeat(opts.repeat)
        }

        if (opts.ignore.indexOf(selector) !== -1) {
          return selector
        }

        if (opts.tags.indexOf(selector) != -1) {
          return `${opts.scopeTo.repeat(opts.repeat)} ${selector}${opts.suffix}`
        }

        if (opts.scopeTo.indexOf(selector) !== -1) {
          return opts.scopeTo.repeat(opts.repeat)
        }

                // For anything else add it before the selector.
        return `${opts.scopeTo.repeat(opts.repeat)} ${selector}`
      })
    })
  }
})
